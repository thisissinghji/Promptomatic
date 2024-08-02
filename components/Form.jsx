import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex flex-col sm:flex-row sm:gap-10">
      <div className="flex flex-col">
        <h1 className="head_text text_left">
          <span className="orange_gradient">{type}</span> Post
        </h1>
        <p className="desc text-left max-w-md">
          {type === "Update"
            ? "Update your existing prompt"
            : `${type} and share amazing prompts with the world.`}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col glassmorphism"
      >
        <label>
          <span className="font-satoshi test-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here"
            className="form_textarea"
            required
          />
        </label>

        <label className="mt-10">
          <span className="font-satoshi test-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#webdev, #javascript, #react, #product, #ai, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            className="form_input"
            required
          />
        </label>

        <div className="flex-end mx-3 mt-5 mb-5 gap-4">
          <Link href="/" className="text-gray-500 hover:text-black">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="py-2 px-4 bg-orange-500 rounded-full text-white font-bold hover:bg-black hover:transition duration-300 ease-in-out"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
