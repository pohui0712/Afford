import React from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";

const Email = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      await axios.post("http://localhost:5500/api/sendEmail", data);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <p className="text-gray-700 -mt-6 dark:text-white/80">
        {/* -mt-6 : negative margin to move up */}
        Please contact me directly at{" "}
        <a className="underline" href="mailto:phxx04@gmail.com">
          {/* mailto: -> to open the sending email tool when clicking into the href */}
          phxx04@gmail.com
        </a>{" "}
        or through this form.
      </p>

      <form className="mt-10 flex flex-col dark:text-black" onSubmit={onSubmit}>
        <input
          className="h-14 px-4 rounded-lg borderBlack dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="senderEmail"
          {...register("senderEmail")}
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 dark:bg-white dark:bg-opacity-80 dark:focus:bg-opacity-100 transition-all dark:outline-none"
          name="message"
          {...register("message")}
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Email;
