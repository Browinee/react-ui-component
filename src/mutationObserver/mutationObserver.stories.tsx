import React, { useRef, useState, useEffect } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MutateObserver from "./MutateObserver";

export default {
  title: "Example/MutateObserver",
  component: MutateObserver,
} as ComponentMeta<typeof MutateObserver>;

export const Basic = () => {
  const [className, setClassName] = useState("aaa");

  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000);
  }, []);

  const callback = function (mutationsList: MutationRecord[]) {
    console.log(mutationsList);
  };
  return (
    <div>
      <MutateObserver onMutate={callback}>
        <div id="container">
          <div className={className}>
            {className === "aaa" ? (
              <div>aaa</div>
            ) : (
              <div>
                <p>bbb</p>
              </div>
            )}
          </div>
        </div>
      </MutateObserver>
    </div>
  );
};
