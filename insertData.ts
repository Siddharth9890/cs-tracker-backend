import { Question } from "./src/models/Question";
import { Subject } from "./src/models/Subject";
import { TopicUnderSubject } from "./src/models/TopicUnderSubject";
import User from "./src/models/User";

// load some sample data to do testing
async function insertUserData() {
  try {
    await User.create({
      email: "siddharth.a9890@gmail.com",
      user_name: "sid",
      role: "user",
      total_number_of_questions_done_by_user: 0,
      verified: false,
      account_status: "active",
      multi_factor_enabled: false,
    });
    await User.create({
      email: "admin@email.com",
      user_name: "admin",
      role: "admin",
      total_number_of_questions_done_by_user: 0,
      verified: false,
      account_status: "active",
    });
    await User.create({
      email: "moderator@email.com",
      user_name: "mod",
      role: "moderator",
      total_number_of_questions_done_by_user: 0,
      verified: false,
      account_status: "active",
    });
  } catch (error) {
    console.log(error);
  }
}

async function insertSubjectData() {
  try {
    await Subject.create({
      subject_name: "DSAAA",
      subject_description: "Data structures and algorithm",
      image_url:
        "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2dyYW1taW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      topic_count: 1,
    });
  } catch (error) {
    console.log(error);
  }
}

async function insertTopicData() {
  try {
    await TopicUnderSubject.create({
      topic_name: "Linked List",
      topic_description: "Linked list question",
      question_count: 1,
      under_which_subject: "DSAAA",
    });
    await TopicUnderSubject.create({
      topic_name: "Dynamic Programming",
      topic_description: "DP question",
      question_count: 1,
      under_which_subject: "DSAAA",
    });
  } catch (error) {
    console.log(error);
  }
}

async function insertQuestionData() {
  try {
    await Question.create({
      question_name: "Reverse Linked List",
      question_description:
        "You are given a linked list and you need to reverse it",
      difficulty: "easy",
      how_many_times_solved: 10,
      leet_code_problem_link:
        "https://leetcode.com/problems/reverse-linked-list/",
      youtube_video_link: "https://www.youtube.com/watch?v=71NqKy7287g",
      under_which_topic: "Linked List",
    });
    await Question.create({
      question_name: "Linked List cycle",
      question_description:
        "You are given a linked list and you need find cycle in it",
      difficulty: "easy",
      how_many_times_solved: 20,
      leet_code_problem_link:
        "https://leetcode.com/problems/revers-linked-list/",
      youtube_video_link: "https://www.youtube.com/watch?v=71NqKy728g",
      under_which_topic: "Linked List",
    });
    await Question.create({
      question_name: "Factorial of number using dp",
      question_description: "find factorial using dp technique",
      difficulty: "medium",
      how_many_times_solved: 1,
      leet_code_problem_link: "https://leetcode.com/problems/reverse-dp-list/",
      youtube_video_link: "https://www.youtube.com/watch?v=72NqKy7287g",
      under_which_topic: "Dynamic Programming",
    });
  } catch (error) {
    console.log(error);
  }
}

export default async function loadData() {
  // await insertSubjectData();
  // await insertTopicData();
  // await insertQuestionData();
  // await insertUserData();
}
