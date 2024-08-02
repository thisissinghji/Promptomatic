'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const promptId = searchParams.get('id');
    if (!promptId) return;

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

    fetchPrompt();
  }, [isClient, searchParams]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const promptId = searchParams.get('id');
    if (!promptId) {
      alert('Prompt not found');
      setSubmitting(false);
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

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to update prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isClient) {
    return null; // or a loading indicator, or anything you want to show while waiting for the client to mount
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
