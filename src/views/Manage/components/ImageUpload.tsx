"use client";

import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
  label?: string;
}

export default function ImageUpload({
  onUploadSuccess,
  className = "",
  label = "Upload Image",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional validation: check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/manage/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success && data.url) {
        toast.success(`Uploaded successfully: ${file.name}`);
        onUploadSuccess(data.url);
      } else {
        toast.error("Failed to parse uploaded file URL");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.error || "Error uploading image to storage");
    } finally {
      setIsUploading(false);
      // Reset input value to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        disabled={isUploading}
      />
      <Button
        onClick={handleButtonClick}
        disabled={isUploading}
        variant="outline"
        size="sm"
        className="rounded-none font-mono text-[9px] uppercase border border-zinc-200 dark:border-zinc-800 bg-background/50 h-9 px-3 cursor-pointer flex items-center gap-1.5"
      >
        {isUploading ? (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <Upload className="w-3 h-3" />
            {label}
          </>
        )}
      </Button>
    </div>
  );
}
