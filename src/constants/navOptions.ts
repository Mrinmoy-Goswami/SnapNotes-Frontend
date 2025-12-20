interface NavOptions {
label:string,
link?:string | null,
items: readonly {
  name:string,
  link:string
}[]
}

export const navigationOptions : NavOptions[] = [  
  {
    label:"Home",
    link : "/",
    items:[]
  },
  {
    label: "Upload",
    link:'/upload',
    items:[]
  },
  {
    label: "My Notes",
    link:null,
    items: [
      { name: "Saved Notes", link: "/notes/saved" },
      { name: "Upload History", link: "/notes/history" },
    ],
  },
  {
    label: "Support",
    link:null,
    items: [
      { name: "Contact Us", link: "mailto:mrinmoygoswami704@gmail.com" } 
    ]
  },
] as const
