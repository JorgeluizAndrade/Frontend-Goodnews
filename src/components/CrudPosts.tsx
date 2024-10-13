"use client"

import React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaTrash } from "react-icons/fa";
import { FaFilePen } from "react-icons/fa6";


import RichTextEditor from "./TextRich";
import { useCreatePost } from "@/hooks/useCreatePost";
import { PostSchema } from "@/schemas/postSchema";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { useDeletePost } from "@/hooks/useDeletePost";
import { useRouter } from "next/navigation";

const CrudPosts = () => {
  const [posts, setPosts] = React.useState<PostSchema[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<string | null>(null);
  const [currentPost, setCurrentPost] = React.useState({
    title: "",
    text: "",
  });
  const [idUser, setIdUser] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true); // Add loading state
  const [error, setError] = React.useState<string | null>(null); // Add error state
  const router = useRouter();

  React.useEffect(() => {
    const userId = localStorage.getItem("USER_ID");
    setIdUser(userId);
  }, []);

  const getData = async () => {
    try {
      if (!idUser) return;
      const urlEndpoint = `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/user/${idUser}`;
      const data = await fetch(urlEndpoint).then((res) => res.json());
      return data;
    } catch (error) {
      setError("Failed to load posts");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setPosts(result.post);
    };

    if (idUser) {
      fetchData();
    }
  }, [idUser]);

  const [content, setContent] = React.useState(currentPost.text || "");

  const { createPost, successMessage, errorMessage } = useCreatePost();
  const { updatePost } = useUpdatePost();
  const { deletePost } = useDeletePost();

  const handleContentChange = (newValue: string) => {
    setContent(newValue);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setCurrentPost({
      title: "",
      text: "",
    });
  };

  const handleEdit = (post: PostSchema) => {
    setIsEditing(post.id || "");
    setCurrentPost({
      title: post.title,
      text: post.text,
    });
    setContent(post.text);
  };

  const handleDelete = async (id: string) => {
    const postDeleted = await deletePost({ id });
    setPosts(posts.filter((post) => post.id !== id));
    return postDeleted;
  };

  const handleSave = async () => {
    if (isEditing) {
      try {
        await updatePost({
          id: isEditing,
          title: currentPost.title,
          text: content,
          user: { id: idUser || "" },
        });
        setPosts(
          posts.map((post) =>
            post.id === isEditing
              ? { ...post, ...currentPost, text: content }
              : post
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar o post:", error);
      }
    } else {
      try {
        const newPost = await createPost({
          title: currentPost.title,
          text: content,
          user: { id: idUser || "" },
        });

        if (newPost) {
          setPosts([...posts, { ...newPost, id: newPost.id }]);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsCreating(false);
    setIsEditing(null);
    setCurrentPost({
      title: "",
      text: "",
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(null);
    setCurrentPost({
      title: "",
      text: "",
    });
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPost({
      ...currentPost,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-6 bg-muted/40">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button variant={"ghost"} onClick={() => handleBack()}>
          Voltar
        </Button>
        <Button onClick={handleCreate}>Create Post</Button>
      </div>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        <>
          {isCreating || isEditing !== null ? (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  {isEditing !== null ? "Edit Post" : "Create Post"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="text">Content</Label>
                  <RichTextEditor
                    value={content}
                    onChange={handleContentChange}
                  />

                  <div className="mt-4">
                    <Label>Preview do Conteúdo</Label>
                    <div
                      className="border rounded p-2 bg-white"
                      dangerouslySetInnerHTML={{ __html: content || "" }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {isEditing !== null ? "Save" : "Create"}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <div
                          dangerouslySetInnerHTML={{ __html: post.text || "" }}
                        />
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(post)}
                          >
                            <FaFilePen className="w-4 h-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => post.id && handleDelete(post.id)}
                          >
                            <FaTrash className="w-4 h-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CrudPosts;
