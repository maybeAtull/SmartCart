import React from "react";
import PickMeals from "../Assets/pick-meals-image.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/delivery-image.png";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "Pick Groceries",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et sagittis duis elementum interdum facilisi bibendum.",
    },
    {
      image: ChooseMeals,
      title: "Choose How much",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et ",
    },
    {
      image: DeliveryMeals,
      title: "Get Faster Services",
      text: "Lorem ipsum dolor sit amet consectetur. Maecenas orci et lorem ipsum",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="text-center mb-12">
        <p className="text-green-500 font-semibold uppercase text-sm mb-2">Work</p>
        <h1 className="text-3xl font-semibold text-gray-900">How It Works</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {workInfoData.map((data) => (
          <div
            key={data.title}
            className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <div className="mb-6">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-40 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{data.title}</h2>
            <p className="text-gray-600">{data.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
