'use client';

import { useState,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/Profile';
import React from 'react'
import { set } from 'mongoose';

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data  = await response.json();
            setUserPosts(data);
          } catch (error) {
            console.error("Failed to fetch posts:", error);
          }
        };
    
        if(session?.user?.id) fetchPosts();
      }, [session?.user?.id]);

      const handleDelete = async (prompt) => {
        const hasConfirmed = confirm('Are you sure you want to delete this prompt?');
    
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${prompt._id}`, {
                    method: 'DELETE',
                });
    
                const filteredPosts = userPosts.filter((post) => post._id !== prompt._id);
                setUserPosts(filteredPosts);
            } catch (error) {
                console.error('Failed to delete prompt:', error);
            }
        }
    };

    const handleEdit = (prompt) =>{
        router.push(`/update-prompt?id=${prompt._id}`);
    }

  return (
    <Profile
    name = "My"
    desc= "Prompts you have shared with the world!!"
    data = {userPosts}
    handleDelete = {handleDelete}
    handleEdit = {handleEdit}
    />
  )
}

export default MyProfile