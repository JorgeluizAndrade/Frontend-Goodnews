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
import RichTextEditor from "./TextRich";
import { useCreatePost } from "@/hooks/useCreatePost";
import { PostSchema } from "@/schemas/postSchema";
import { useUpdatePost } from "@/hooks/useUpdatePost";
import { useDeletePost } from "@/hooks/useDeletePots";

const getData = async () => {
  const data = await fetch("http://localhost:8080/api/posts").then((res) =>
    res.json()
  );
  return data;
};

const CrudPosts = () => {
  const [posts, setPosts] = React.useState<PostSchema[] >([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState<string | null>(null);
  const [currentPost, setCurrentPost] = React.useState<{
    title: string;
    text: string;
  }>({
    title: "",
    text: "",
  });
  const [idUser, setIdUser] = React.useState<string | null>(null);

  React.useEffect(() => {
    const userId = localStorage.getItem("USER_ID");
    setIdUser(userId);
  }, []);



  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setPosts(result);
    };

    fetchData();
  }, []);

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
    const postDeleted = await deletePost({id})
    setPosts(posts.filter((post) => post.id !== id));
    return postDeleted
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
            post.id === isEditing ? { ...post, ...currentPost, text: content } : post
          )
        );
      } catch (error) {
        console.error("Erro ao atualizar o post:", error);
      }
    } else {
      // Criando um novo post
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
    // Resetando o estado após salvar
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
        <Button onClick={handleCreate}>Create Post</Button>
      </div>

      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
            <div  className="space-y-2" >
              <Label htmlFor="text">Content</Label>
              <RichTextEditor  value={content} onChange={handleContentChange} />
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
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(post)}
                      >
                        <FilePenIcon className="w-4 h-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => post.id && handleDelete(post.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
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
    </div>
  );
};

function FilePenIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default CrudPosts;
