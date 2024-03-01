export interface UserInterface {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

export interface CourseInterface {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  duration: string;
  genre: string;
  reviews?: ReviewInterface[];
  lastWatchedClipId?: string;
  progress?: number; // This should be a float value between 0 and 1 representing the progress percentage.
  lastWatchedAt?: Date; // Add this line
}

export interface ReviewInterface {
  id: string;
  rating: number;
  review: string;
  userId: string;
  courseId: string;
  user: UserInterface;
  course: CourseInterface;
}

export type CourseProgressResponse = {
  id: string;
  userId: string;
  profileId: string | null;
  courseId: string;
  progress: number;
  finished: boolean;
};


// types/index.ts

export interface BillboardInterface {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string; // URL to the image displayed on the billboard
  trailerVideoUrl: string; // URL to the video played in the billboard background
  // ... any additional properties related to the billboard feature
}
