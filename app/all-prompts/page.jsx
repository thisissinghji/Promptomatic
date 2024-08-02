"use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import { useRouter } from "next/navigation";
import { set } from "mongoose";

const PromptCardList = ({ data }) => {
  return (
    <div className="prompt_layout mt-10">
      {data.map((prompt) => (
        <PromptCard key={prompt._id} prompt={prompt} />
      ))}
    </div>
  );
};

const AllPrompts = () => {
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section>
      <div className="flex flex-start flex-col">
      <h1 className="head_text text_left">
        <span className="orange_gradient">Explore All Prompts</span>
      </h1>
      <p className="desc text-left max-w-md">
        Find the most amazing prompts shared by the community.
      </p>
      <form className="relative w-full flex-center mt-3">
        <input
          type="text"
          placeholder="Search for tags or username or anything..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="form_input peer lg:w-1/2 lg:mr-auto"
        />
      </form>
      </div>
      <PromptCardList data={filteredPosts} />
    </section>
  );
};

export default AllPrompts;
