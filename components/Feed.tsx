"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts,setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    const newPosts = posts.filter((x) => x.tag.toLowerCase().includes(tag.toLowerCase()));
    setFilteredPosts(newPosts);
  } 

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (searchText != null) {
      console.log(searchText)
      const newPosts = posts.filter((x) => x.prompt.toLowerCase().includes(searchText.toLowerCase()) || x.tag.toLowerCase().includes(searchText.toLowerCase()) || x.creator.username.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredPosts(newPosts);
    }
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText == null ? "" : searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
