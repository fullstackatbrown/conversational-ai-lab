"use client";

import { ReactElement } from "react";

type User = {
  name: string;
  bio: string;
};

const tim: User = {
  name: "Tim",
  bio: "This is Tim, tims been on the team a long time so we love tim. I think he's interested in conversational AI or something",
};

const sally: User = {
  name: "Sally",
  bio: "This is Sally, she's a big name in the industry so we're so excited to have her on the team!",
};

const dan: User = {
  name: "Dan",
  bio: "This is Dan, i don't know dan very well but he seems pretty chill.",
};

const allison: User = {
  name: "Allison",
  bio: "This is Allison, she's not as much of a fan of converstional AI as Tim, but she's more of a fan than Sally.",
};

var users: User[];
users = [tim, sally, dan, allison];

export default function Team() {
  let users_section: ReactElement[] = [];

  // loop through each user to create the user section
  users.forEach((user, index) => {
    let img = (
      <img
        src={`assets/team/${user.name}.jpg`}
        width={"400px"}
        height={"400px"}
      />
    );
    let bio = (
      <div className="justify-left flex w-1/2">
        {/* <div className="transition-all duration-300 w-full lg:text-2xl text-lg flex items-center">
                    {user.name}<br></br>
                    {user.bio}
                </div> */}
        <div className="transition-all duration-300 w-full flex items-center">
          <div className="">
            <div className="lg:text-2xl text-lg font-bold">{user.name}</div>
            <div className="lg:text-2xl text-lg">{user.bio}</div>
          </div>
        </div>
        {/* <div className="transition-all duration-300 w-full lg:text-2xl text-lg flex items-center">
                    {user.bio}
                </div> */}
      </div>
    );

    if (index % 2 == 0) {
      users_section.push(
        <div className="lg: center lg:gap-10 flex flex-row px-10 py-10 justify-center">
          {img}
          {bio}
        </div>
      );
    } else {
      users_section.push(
        <div className="lg: center lg:gap-10 flex flex-row px-10 py-10 justify-center">
          {bio}
          {img}
        </div>
      );
    }
  });

  return (
    <div>
      <div className="bg-[#4D81ED] flex flex-col items-center justify-center w-full h-[200px]">
        <div className="text-left w-full px-10 lg:px-[150px]">
          <h1 className="lg:text-5xl text-4xl text-white">Our Team</h1>
        </div>
      </div>
      <div className="py-2.5"></div>

      {/* <div>{users_section}</div> */}
      <div className="lg: center lg:gap-10 flex flex-row px-10 py-10 justify-center">
        <div className="transition-all duration-300 w-full items-center">
          <div className="">
            <div className="lg:text-2xl text-lg text-center">
              Check back here to get to know our team!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
