export const navigationOptions = [
  {
    label: "Home",
    items: [],
  },    
  {
    label: "Upload",
    items: [
      { name: "New Upload", link: "/upload" },
      { name: "Upload History", link: "/uploads/history" },
    ],
  },
  {
    label: "My Notes",
    items: [
      { name: "Saved Notes", link: "/notes/saved" },
      { name: "Summarized Notes", link: "/notes/summary" },
      { name: "PDF Generator", link: "/notes/pdf-generator" },
    ],
  },
  {
    label: "Explore AI",
    items: [
      { name: "Auto Highlights", link: "/ai/highlights" },
      { name: "Important Questions", link: "/ai/questions" },
      { name: "Topic Categorization", link: "/ai/topics" },
    ],
  },
  {
    label: "Account",
    items: [
      { name: "Profile", link: "/account/profile" },
      { name: "Logout", link: "/logout" },
    ],
  },
  {
    label: "Support",
    items: [
      { name: "Raise Issue", link: "/support/issue" },
      { name: "Contact Us", link: "/support/contact" } 
    ]
  },
];
