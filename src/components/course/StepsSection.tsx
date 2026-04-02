import React from "react";

export interface StepItem {
  title: string;
  description: string;
}

export interface StepsSectionProps {
  heading: string;
  steps: StepItem[];
}

const StepsSection = ({ stepsData }: { stepsData: StepsSectionProps }) => {
  return (
    <section className="w-full  py-8 lg:py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 lg:gap-16">

        <h2 className="text-center text-2xl font-semibold text-purple-600">
          {stepsData.heading}
        </h2>

        <div className="flex flex-col gap-8">
          {stepsData.steps.map((step, i) => (
            <div key={i} className="flex gap-5 items-start">

              <div className="min-w-[36px] h-9 rounded-full bg-green-700 text-white flex items-center justify-center font-semibold">
                {i + 1}
              </div>

              <div>
                <h3 className="font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {step.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StepsSection;