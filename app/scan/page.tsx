// pages/barcode-scanner.js or app/barcode-scanner/page.js
"use client"; // Add this if using the Next.js App Router

import { getProductData } from '@/api/productData';

import React, { useState, useRef, useEffect } from 'react';

export default function BarcodeScanner() {
  const [result, setResult] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [isLibraryLoaded, setIsLibraryLoaded] = useState(false);
  const [productInfo, setProductInfo] = useState("Product info...");
  
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize the barcode reader when component mounts
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadLibrary = async () => {
      try {
        // Import the library dynamically
        const ZXing = await import('@zxing/library');
        const { BrowserMultiFormatReader } = ZXing;
        
        codeReaderRef.current = new BrowserMultiFormatReader();
        setIsLibraryLoaded(true);
        
        // Get available video devices
        const videoInputDevices = await codeReaderRef.current.listVideoInputDevices();
        setDevices(videoInputDevices);
        
        if (videoInputDevices.length > 0) {
          setSelectedDeviceId(videoInputDevices[0].deviceId);
        }
      } catch (err) {
        console.error('Failed to load ZXing library:', err);
        setError(`Failed to initialize scanner: ${err.message}`);
      }
    };

    loadLibrary();
    
    // Clean up on unmount
    return () => {
      if (codeReaderRef.current) {
        try {
          codeReaderRef.current.reset();
        } catch (err) {
          console.warn('Error during cleanup:', err);
        }
      }
    };
  }, []);

  const startScanner = async () => {
    if (!codeReaderRef.current || !selectedDeviceId) {
      setError('Scanner not initialized or no camera selected');
      return;
    }
    
    try {
      setError(null);
      setScanning(true);
      
      // Start continuous scanning
      const controls = await codeReaderRef.current.decodeFromVideoDevice(
        selectedDeviceId,
        videoRef.current,
        (result, err) => {
          if (err) {
            // Ignore typical scanning errors
            if (!err.message?.includes('No MultiFormat Readers were able to detect the code')) {
              console.warn('Decode warning:', err);
            }
            return;
          }
          
          if (result) {
            setResult(result.getText());
            handleBarcode(result.getText());
            // ======================================= ON SCAN
            // Uncomment to stop after first successful scan
            // stopScanner();
          }
        }
      );
      
      // Store controls for cleanup
      streamRef.current = controls;
      
    } catch (err) {
      setError(`Failed to start scanner: ${err.message}`);
      setScanning(false);
    }
  };

  const stopScanner = () => {
    setScanning(false);
    
    // Reset the reader (this will stop the video stream too)
    if (codeReaderRef.current) {
      try {
        codeReaderRef.current.reset();
      } catch (err) {
        console.warn('Error resetting code reader:', err);
      }
    }
    
    streamRef.current = null;
  };

  const handleDeviceChange = (e) => {
    if (scanning) {
      stopScanner();
    }
    setSelectedDeviceId(e.target.value);
  };

  function handleBarcode( barcode:any ) {
    getProductData(barcode, setProductInfo)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>
      <h1>{productInfo}</h1>
      { error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      ) }
      
      {!isLibraryLoaded && !error && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          Initializing camera and scanner...
        </div>
      )}
      
      {isLibraryLoaded && devices.length === 0 && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          No cameras detected. Please ensure camera permissions are granted.
        </div>
      )}
      
      {isLibraryLoaded && devices.length > 0 && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Select Camera:</label>
            <select 
              className="w-full p-2 border rounded"
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              disabled={scanning}
            >
              {devices.map(device => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId.slice(0, 5)}...`}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2 mb-4">
            <button
              className={`${scanning ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
              onClick={startScanner}
              disabled={scanning || !selectedDeviceId}
            >
              {scanning ? 'Scanning...' : 'Start Scanner'}
            </button>
            <button
              className={`${!scanning ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-700'} text-white font-bold py-2 px-4 rounded`}
              onClick={stopScanner}
              disabled={!scanning}
            >
              Stop Scanner
            </button>
          </div>
          
          <div className="mb-4 overflow-hidden bg-black rounded relative">
            <video ref={videoRef} className="w-full h-64 object-cover" />
            {scanning && (
              <div className="absolute inset-0 border-2 border-blue-500 animate-pulse pointer-events-none"></div>
            )}
          </div>
          
          {/* {result && ( */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Result:</h2>
              <div className="mt-2 p-3 bg-gray-100 rounded break-all">
                {result}
              </div>
            </div>
          {/* // )} */}
        </>
      )}
    </div>
  );
}