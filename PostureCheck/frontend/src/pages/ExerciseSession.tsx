import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ExerciseSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const exerciseName = location.state?.exerciseName || 'Exercise';
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = async (file: File) => {
    if (file.type !== 'video/mp4') {
      toast.error('Please upload an MP4 video file');
      return;
    }

    setUploadedFile(file);

    // Upload to backend
    const formData = new FormData();
    formData.append('video', file);
    formData.append('exerciseName', exerciseName);
    formData.append('targetDir', 'output');
    
    try {
      const response = await fetch('http://localhost:3001/api/upload-video?targetDir=output', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.json();
        // Display the "New" version of the video
        const newVideoUrl = `http://localhost:3001${result.newFilePath}`;
        setVideoUrl(newVideoUrl);
        toast.success('Video uploaded and saved successfully');
      } else {
        toast.error('Failed to save video to backend');
      }
    } catch (error) {
      toast.error('Error connecting to backend');
      console.error('Upload error:', error);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClear = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    setUploadedFile(null);
    setVideoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.info('Video cleared');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className="text-xl font-bold text-foreground">
            {exerciseName}
          </h1>
          
          {uploadedFile && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="gap-2"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
          {!uploadedFile && <div className="w-20" />}
        </div>
      </header>

      {/* Split Screen Layout */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Side - Video Display */}
        <div className="w-1/2 bg-black flex items-center justify-center p-8">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="max-w-full max-h-full rounded-lg"
            />
          ) : (
            <div className="text-center space-y-4">
              <div className="text-muted-foreground text-lg">
                Your uploaded video will display here
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Upload Area */}
        <div className="w-1/2 bg-background flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-12 transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-accent/20'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-accent/10'
              }`}
            >
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-secondary">
                    <Upload className="w-8 h-8 text-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    Upload your exercise video
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    MP4 files only
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4"
                >
                  Browse Files
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                {uploadedFile && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-foreground font-medium">
                      {uploadedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {!uploadedFile && (
              <p className="text-center text-sm text-muted-foreground">
                Drag and drop your video here, or click browse
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSession;
