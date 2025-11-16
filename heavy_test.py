import io
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

import cv2
import numpy as np

def landmarks_to_np(landmarks, indicies, w, h):
    np_landmarks = []
    for idx in indicies:
        x, y = int(landmarks[idx].x * w), int(landmarks[idx].y * h)
        np_landmarks.append([x,y])

    return np_landmarks


def squat_parallel(frame, landmarks, w, h):

    KNEE_LANDMARKS = landmarks_to_np(landmarks, [26, 25], w, h) # right, left
    HIP_LANDMARKS = landmarks_to_np(landmarks, [24, 23], w, h)     # right, left
    knee_avg_pos  = np.mean(KNEE_LANDMARKS, axis=0).astype(int)
    hip_avg_pos = np.mean(HIP_LANDMARKS, axis=0).astype(int)

    if(knee_avg_pos[1] > hip_avg_pos[1]):
        cv2.circle(frame, knee_avg_pos, radius = 4, thickness=4, color=(255,0,0))
        cv2.circle(frame, hip_avg_pos, radius = 4, thickness=4, color=(0,0,255))
    else: 
        cv2.circle(frame, knee_avg_pos, radius = 8, thickness=8, color=(255,0,0))
        cv2.circle(frame, hip_avg_pos, radius = 8, thickness=8, color=(0,0,255))

    # returns true if the hip goes below the kneews (Worry about angle later)

def squat_knee_over_toe(frame, landmarks, w, h):
    KNEE_LANDMARKS = landmarks_to_np(landmarks, [26, 25], w, h) # right, left
    RIGHT_FOOT_LANDMARK = landmarks_to_np(landmarks, [32], w, h) # right  ankle, right heel, right foot index, (repeat for lefa)
    LEFT_FOOT_LANDMARK = landmarks_to_np(landmarks, [31], w, h)


    knee_avg_pos  = np.mean(KNEE_LANDMARKS, axis=0).astype(int)
    right_foot_mid = np.mean(RIGHT_FOOT_LANDMARK, axis=0).astype(int)
    left_foot_mid = np.mean(LEFT_FOOT_LANDMARK, axis=0).astype(int)

    """
    TO DO: How to figure out t do only one,
    - idea, only print the max
    """
    # right
    cv2.circle(frame, KNEE_LANDMARKS[0], radius=3,thickness=3, color=(0,255,255))
    # left
    cv2.circle(frame, KNEE_LANDMARKS[1], radius=3,thickness=3, color=(255,255,0))


    cv2.circle(frame, right_foot_mid, radius=3, thickness=3, color =(0,127, 127))
    cv2.circle(frame, left_foot_mid, radius=3, thickness=3, color =(127, 127, 0))



def draw_landmarks(frame, landmarks, indicies, w, h):
    landmarks = landmarks_to_np(landmarks, indicies, w, h)
    for mark in landmarks:
        cv2.circle(frame, center=mark, radius=4, thickness=4, color=(0,255,0))


BODY_LANDMARKS = [32,30,28,26,24,12,14,16,22,18,20,11,13,21,15,19,17,23,25,27,29,31]
model_path = "pose_landmarker_heavy.task"

BaseOptions = mp.tasks.BaseOptions
PoseLandmarker = mp.tasks.vision.PoseLandmarker
PoseLandmarkerOptions = mp.tasks.vision.PoseLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

# Create a pose landmarker instance with the video mode:
options = PoseLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=model_path),
    running_mode=VisionRunningMode.VIDEO)

landmarker = PoseLandmarker.create_from_options(options)

video_path = "videos/squat2.mp4"
cap = cv2.VideoCapture(video_path)


# fps = cap.get(cv2.CAP_PROP_FPS) 
# w, h = cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT
# print(f"h:{h}. w{w} ")
timeStamp = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    h, w = frame.shape[:2]
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame)
    results = landmarker.detect_for_video(mp_image, timeStamp)
    timeStamp += 1
    
    if results.pose_landmarks:
        results = results.pose_landmarks[0] # the ordering of what happends with multiple people is to be done later

        # draw_landmarks(frame, results, BODY_LANDMARKS, w, h)
        squat_knee_over_toe(frame, results, w, h)
        squat_parallel(frame, results, w, h)


        if cv2.waitKey(1) == ord('q'):
                break
    else:
        print("body not found")
        continue 
    # break
    cv2.imshow("Frame", frame)

    



cap.release()
# out.release()
cv2.destroyAllWindows()



