import axios from "axios";
import { Subject } from "./src/models/Subject";
import { TopicUnderSubject } from "./src/models/TopicUnderSubject";

export async function loadA2ZSheet() {
  try {
    const { data } = await axios.get(
      "https://gist.githubusercontent.com/charitra1022/3c963e85a7f5715f377db330c6bf5b87/raw/552981ba037b174f59dd2b96118f41be84673590/ques_list.json"
    );
    // console.log(data);
    // const { data: original } = await axios.get(
    //   "https://api.takeuforward.org/api/singletopic/single/a2z?topicName=strivers_a2z_sheet"
    // );
    // console.log(original);
    const groupedData = data.reduce((acc: any, item: any) => {
      const topicTitle = item["topic-title"];
      const stepMatch = item["subtopic-title"].match(/Step (\d+\.\d+):/);

      // Group by 'topic-title'
      if (!acc[topicTitle]) {
        acc[topicTitle] = {};
      }

      // Group by 'Step' part within 'topic-title'
      if (stepMatch) {
        const stepPart = stepMatch[1];
        if (!acc[topicTitle][stepPart]) {
          acc[topicTitle][stepPart] = [];
        }
        acc[topicTitle][stepPart].push(item);
      }

      return acc;
    }, {});

    const resultArray: {
      topic: string;
      subtopics: { title: string; questions: any[] }[];
    }[] = Object.keys(groupedData).map((topicTitle) => {
      const subtopicsArray = Object.keys(groupedData[topicTitle]).map(
        (subtopicTitle) => {
          return {
            title: subtopicTitle,
            questions: groupedData[topicTitle][subtopicTitle],
          };
        }
      );

      return {
        topic: topicTitle,
        subtopics: subtopicsArray,
      };
    });

    // Log the result
    console.log(resultArray[0], resultArray[1], resultArray[2]);
    // Log the result
    resultArray.map(async (data: any) => {
      await TopicUnderSubject.create({
        topic_name: data.topic,
        topic_description: data.topic,
        question_count: data.subtopics.length,
        under_which_subject: "A2ZDSA",
      });
    });
  } catch (error) {
    console.log(error);
  }
}
