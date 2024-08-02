import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleDelete, handleEdit }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="orange_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left"> {desc}</p>

      <div className="prompt_layout mt-10">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleDelete={()=>handleDelete && handleDelete(prompt)}
            handleEdit={()=>handleEdit && handleEdit(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
