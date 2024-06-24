import React from "react";
import MarkDown from "./MarkDown";

export default function About() {
  const about = `# **Welcome to \`CodeRoad\`**

  - ###### **\`CodeRoad\`** is your ultimate destination for learning and mastering coding skills. Whether you're a beginner or an experienced programmer, we provide a platform where you can explore various topics, take quizzes to test your knowledge, engage with the community through posts and comments, and continuously improve your coding abilities.
  
  ## **What We Offer**
  
  
   
   #### 1. **Markdown Topics Creation**
  
  - ###### Create and explore topics using Markdown, allowing for easy formatting and organization. Markdown makes it simple to structure your content and share it with others.
  
   #### 2. **Quiz Creation and Results Storage**
  
  - ###### Challenge yourself with quizzes on a wide range of coding topics. Track your progress and see how your skills improve over time. Your quiz results are securely stored, allowing you to review them whenever you need.
  
  #### 3. **Post Creation, Update, and Deletion**
  
  - ###### Share your insights, experiences, and questions with the community through posts. Update or delete your posts as needed to keep the conversation relevant and engaging.
  
   #### 4. **Like, Dislike, and Comment Features**
  
  - ###### Interact with posts by liking, disliking, and commenting. Engage in discussions, offer feedback, and connect with fellow learners and experts in the field.
  
  #### 5. **User Account Management**
  
  - ###### Create a user account to personalize your experience on \`CodeRoad\`. Easily update your name and password to keep your account secure and up to date.
  
  #### 6. **Comprehensive Search Functionality**
  
  - ###### Effortlessly find the topics you're interested in by searching based on level, title, or topic name. Our advanced search feature helps you quickly locate the information you need to continue your learning journey.
  
  ### **Get Started Today**
  
  - ###### Embark on your coding journey with \`CodeRoad\`. Whether you're looking to learn the basics or dive deep into advanced concepts, we're here to support you every step of the way. Join our community of passionate learners and take your coding skills to new heights.`;
  return <MarkDown markdown={about} />;
}
