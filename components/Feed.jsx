"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data }) => {
  return (
    <div className="prompt_layout mt-10">
      {data.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);

    const filtered = posts.filter((post) => 
      post.creator.username.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.prompt.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredPosts(filtered);
  };
   function handleSeeAll() {
    router.push("/all-prompts");
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data  = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tags or username or anything..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="form_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts.slice(0, 3)} />
      {filteredPosts.length > 3 && (
        <button onClick={handleSeeAll} className="mb-5 black_btn">
          See All
        </button>
      )}
    </section>
  );
};

export default Feed;
