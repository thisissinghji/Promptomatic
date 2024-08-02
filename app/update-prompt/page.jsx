'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Failed to fetch prompt:', error);
      }
    };

    if(promptId) fetchPrompt();
  }, [promptId]);

    const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if(!promptId){
        alert('Prompt not found'); 
        return;
    }
        
    try {
        const response = await fetch(`/api/prompt/${promptId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                prompt: post.prompt,
                tag: post.tag,
            }),
        });

        if(response.ok){
            router.push('/');
        }
    } catch (error) {
        console.error('Failed to update prompt:', error);
    }
    finally {
        setSubmitting(false);
    }
}

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;