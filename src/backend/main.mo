import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Int "mo:core/Int";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type Subject = {
    id : Nat;
    name : Text;
    description : Text;
  };

  type ImportantQuestion = {
    id : Nat;
    subjectId : Nat;
    questionText : Text;
    answer : Text;
    explanation : Text;
    topic : Text;
  };

  type QuizQuestion = {
    id : Nat;
    questionText : Text;
    optionA : Text;
    optionB : Text;
    optionC : Text;
    optionD : Text;
    correctOption : Text;
    explanation : Text;
  };

  type Quiz = {
    id : Nat;
    title : Text;
    subjectId : Nat;
    description : Text;
    timeLimitMinutes : Nat;
    questionIds : [Nat];
  };

  type QuizAttempt = {
    id : Nat;
    quizId : Nat;
    userId : Principal;
    answers : [(Nat, Text)];
    score : Nat;
    totalQuestions : Nat;
    completedAt : Int;
  };

  public type UserProfile = {
    name : Text;
  };

  let subjects = Map.empty<Nat, Subject>();
  let importantQuestions = Map.empty<Nat, ImportantQuestion>();
  let quizQuestions = Map.empty<Nat, QuizQuestion>();
  let quizzes = Map.empty<Nat, Quiz>();
  let quizAttempts = Map.empty<Nat, QuizAttempt>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var subjectCounter = 0;
  var importantQuestionCounter = 0;
  var quizQuestionCounter = 0;
  var quizCounter = 0;
  var quizAttemptCounter = 0;

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Subject Management
  public shared ({ caller }) func addSubject(name : Text, description : Text) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add subjects");
    };

    subjectCounter += 1;
    let subject : Subject = {
      id = subjectCounter;
      name;
      description;
    };
    subjects.add(subject.id, subject);
    subject.id;
  };

  public shared ({ caller }) func updateSubject(id : Nat, name : Text, description : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update subjects");
    };

    switch (subjects.get(id)) {
      case (null) { Runtime.trap("Subject not found") };
      case (?_) {
        let updatedSubject : Subject = {
          id;
          name;
          description;
        };
        subjects.add(id, updatedSubject);
      };
    };
  };

  public shared ({ caller }) func deleteSubject(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete subjects");
    };

    if (not subjects.containsKey(id)) {
      Runtime.trap("Subject not found");
    };
    subjects.remove(id);
  };

  public query ({ caller }) func getAllSubjects() : async [Subject] {
    subjects.values().toArray();
  };

  // Important Questions Management
  public shared ({ caller }) func addImportantQuestion(
    subjectId : Nat,
    questionText : Text,
    answer : Text,
    explanation : Text,
    topic : Text,
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add important questions");
    };

    if (not subjects.containsKey(subjectId)) {
      Runtime.trap("Subject not found");
    };

    importantQuestionCounter += 1;
    let question : ImportantQuestion = {
      id = importantQuestionCounter;
      subjectId;
      questionText;
      answer;
      explanation;
      topic;
    };
    importantQuestions.add(question.id, question);
    question.id;
  };

  public shared ({ caller }) func updateImportantQuestion(
    id : Nat,
    subjectId : Nat,
    questionText : Text,
    answer : Text,
    explanation : Text,
    topic : Text,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update important questions");
    };

    switch (importantQuestions.get(id)) {
      case (null) { Runtime.trap("Important question not found") };
      case (?_) {
        let updatedQuestion : ImportantQuestion = {
          id;
          subjectId;
          questionText;
          answer;
          explanation;
          topic;
        };
        importantQuestions.add(id, updatedQuestion);
      };
    };
  };

  public shared ({ caller }) func deleteImportantQuestion(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete important questions");
    };

    if (not importantQuestions.containsKey(id)) {
      Runtime.trap("Important question not found");
    };
    importantQuestions.remove(id);
  };

  public query ({ caller }) func getImportantQuestionsBySubject(subjectId : Nat) : async [ImportantQuestion] {
    let filteredQuestions = importantQuestions.values().toArray().filter(
      func(q) { q.subjectId == subjectId }
    );
    filteredQuestions;
  };

  // Quiz Questions Management
  public shared ({ caller }) func addQuizQuestion(
    questionText : Text,
    optionA : Text,
    optionB : Text,
    optionC : Text,
    optionD : Text,
    correctOption : Text,
    explanation : Text,
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add quiz questions");
    };

    quizQuestionCounter += 1;
    let quizQuestion : QuizQuestion = {
      id = quizQuestionCounter;
      questionText;
      optionA;
      optionB;
      optionC;
      optionD;
      correctOption;
      explanation;
    };
    quizQuestions.add(quizQuestion.id, quizQuestion);
    quizQuestion.id;
  };

  public shared ({ caller }) func updateQuizQuestion(
    id : Nat,
    questionText : Text,
    optionA : Text,
    optionB : Text,
    optionC : Text,
    optionD : Text,
    correctOption : Text,
    explanation : Text,
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update quiz questions");
    };

    switch (quizQuestions.get(id)) {
      case (null) { Runtime.trap("Quiz question not found") };
      case (?_) {
        let updatedQuestion : QuizQuestion = {
          id;
          questionText;
          optionA;
          optionB;
          optionC;
          optionD;
          correctOption;
          explanation;
        };
        quizQuestions.add(id, updatedQuestion);
      };
    };
  };

  public shared ({ caller }) func deleteQuizQuestion(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete quiz questions");
    };

    if (not quizQuestions.containsKey(id)) {
      Runtime.trap("Quiz question not found");
    };
    quizQuestions.remove(id);
  };

  // Quiz Management
  public shared ({ caller }) func addQuiz(
    title : Text,
    subjectId : Nat,
    description : Text,
    timeLimitMinutes : Nat,
    questionIds : [Nat],
  ) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add quizzes");
    };

    quizCounter += 1;
    let quiz : Quiz = {
      id = quizCounter;
      title;
      subjectId;
      description;
      timeLimitMinutes;
      questionIds;
    };
    quizzes.add(quiz.id, quiz);
    quiz.id;
  };

  public shared ({ caller }) func updateQuiz(
    id : Nat,
    title : Text,
    subjectId : Nat,
    description : Text,
    timeLimitMinutes : Nat,
    questionIds : [Nat],
  ) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update quizzes");
    };

    switch (quizzes.get(id)) {
      case (null) { Runtime.trap("Quiz not found") };
      case (?_) {
        let updatedQuiz : Quiz = {
          id;
          title;
          subjectId;
          description;
          timeLimitMinutes;
          questionIds;
        };
        quizzes.add(id, updatedQuiz);
      };
    };
  };

  public shared ({ caller }) func deleteQuiz(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete quizzes");
    };

    if (not quizzes.containsKey(id)) {
      Runtime.trap("Quiz not found");
    };
    quizzes.remove(id);
  };

  public query ({ caller }) func getQuizzesBySubject(subjectId : Nat) : async [Quiz] {
    let filteredQuizzes = quizzes.values().toArray().filter(
      func(q) { q.subjectId == subjectId }
    );
    filteredQuizzes;
  };

  public query ({ caller }) func getQuizWithQuestions(quizId : Nat) : async {
    quiz : ?Quiz;
    questions : [QuizQuestion];
  } {
    switch (quizzes.get(quizId)) {
      case (null) {
        return { quiz = null; questions = [] };
      };
      case (?quiz) {
        let questions = quiz.questionIds.map(
          func(qId) {
            switch (quizQuestions.get(qId)) {
              case (null) { null };
              case (?question) { ?question };
            };
          }
        ).filter(func(q) { q != null }).map(func(q) { switch (q) { case (null) { Runtime.trap("Should not happen") }; case (?question) { question } } });
        { quiz = ?quiz; questions };
      };
    };
  };

  // Quiz Attempts
  public shared ({ caller }) func submitQuizAttempt(
    quizId : Nat,
    answers : [(Nat, Text)],
  ) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit quiz attempts");
    };

    quizAttemptCounter += 1;

    let quizAttempt : QuizAttempt = {
      id = quizAttemptCounter;
      quizId;
      userId = caller;
      answers;
      score = 0;
      totalQuestions = answers.size();
      completedAt = Time.now();
    };

    quizAttempts.add(quizAttempt.id, quizAttempt);
    quizAttempt.id;
  };

  public query ({ caller }) func getUserQuizAttempts(userId : Principal) : async [QuizAttempt] {
    if (caller != userId and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own quiz attempts");
    };

    quizAttempts.values().toArray().filter(
      func(attempt) { attempt.userId == userId }
    );
  };
};
