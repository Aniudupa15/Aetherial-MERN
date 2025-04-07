import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';
import app from '../firebase/firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Widget() {
    const { currentUser } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };

    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);
  
    const uploadImage = async () => {
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            'Could not upload image (File must be less than 2MB)'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          });
        }
      );
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
            <div className="col-span-full md:col-span-1 bg-white rounded-lg shadow p-8">
              <div className="flex flex-col items-center">
                <h2 className="font-bold text-2xl m-6">PROFILE</h2>
                <input type="file" accept="image/*" onClick={handleImageChange} ref={filePickerRef} hidden/>
                {imageFileUploadProgress && (
                  <div className="w-12 h-12">
                    <CircularProgressbar
                      value={imageFileUploadProgress || 0}
                      text={`${imageFileUploadProgress}%`}
                      strokeWidth={5}
                      styles={{
                        root: {
                          width: '100%',
                          height: '100%',
                        },
                        path: {
                          stroke: `rgba(62, 152, 199, ${imageFileUploadProgress / 100})`,
                        },
                      }}
                    />
                  </div>
                )}    
                <img
                  src={imageFileUrl || currentUser.profilePicture}
                  alt="Profile Picture"
                  onClick={() => filePickerRef.current.click()}
                  className={`rounded-full w-32 h-32 object-cover border-8 border-[lightgray] ${
                    imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'
                  }`}
                />
                {imageFileUploadError && (
                  <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                <h2 className="font-bold text-2xl">{currentUser.username}</h2>
                <p className="text-zinc-600">{currentUser.email}</p>
                <div className="mt-8 space-x-4">
                  <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
                    Buy Now
                  </button>
                  <button className="bg-zinc-200 text-zinc-700 px-6 py-3 rounded hover:bg-zinc-300">
                    Test Now
                  </button>
                </div>
              </div>
              <div className="mt-10 space-y-4">
                <div className="flex items-center space-x-2">
                  <span>Aetherial ID: </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>Aetherial Guide: Anirudh Udupa</span>
                </div>
              </div>
            </div>

            <div className="col-span-full md:col-span-1 bg-white rounded-lg shadow p-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Full Name</h4>
                    <p>Johnatan Smith</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p>{currentUser.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p>(097) 234-5678</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mobile</h4>
                    <p>(098) 765-4321</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Address</h4>
                    <p>Bay Area, San Francisco, CA</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Health Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Blood Group</h4>
                    <p>B+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
