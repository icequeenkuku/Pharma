import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Edit2, Trash2 } from "lucide-react";
import type { Comment, Sentiment } from "@/data/mockData";

const sentimentColor: Record<Sentiment, string> = {
  Positive: "text-success",
  Neutral: "text-muted-foreground",
  Cautious: "text-warning",
};

export function CommentsSection({ comments: initialComments }: { comments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "Current Donor", // Mocked current user
      role: "Donor",
      text: newComment,
      date: new Date().toISOString().split("T")[0],
      sentiment: "Neutral",
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleDelete = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
  };

  const startEdit = (comment: Comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
  };

  const saveEdit = (id: string) => {
    if (!editText.trim()) return;
    setComments(comments.map(c => c.id === id ? { ...c, text: editText } : c));
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="font-display font-semibold text-lg">Comments</h3>
        <Badge variant="secondary" className="text-xs">{comments.length}</Badge>
      </div>

      <div className="space-y-3 mb-6">
        <Textarea 
          placeholder="Add a comment..." 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px]"
        />
        <Button onClick={handleAddComment} size="sm" variant="glow" disabled={!newComment.trim()}>
          Post Comment
        </Button>
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-muted-foreground py-4 text-center">No comments yet</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 rounded-lg bg-secondary/30 border border-border/30 space-y-3 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <Badge variant={comment.role === "Donor" ? "default" : "info"} className="text-[10px] px-1.5 py-0">
                    {comment.role}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${sentimentColor[comment.sentiment]}`}>
                    {comment.sentiment}
                  </span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
              </div>

              {editingId === comment.id ? (
                <div className="space-y-2 mt-2">
                  <Textarea 
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="min-h-[60px] text-sm"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="ghost" size="sm" onClick={cancelEdit}>Cancel</Button>
                    <Button size="sm" onClick={() => saveEdit(comment.id)}>Save</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm text-foreground/80 leading-relaxed max-w-[90%]">{comment.text}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => startEdit(comment)}>
                      <Edit2 className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10" onClick={() => handleDelete(comment.id)}>
                      <Trash2 className="w-3.5 h-3.5 text-destructive" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
