import axios from "axios";
import { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Symptoms from "./Symptoms";

function Dashboard() {
  const [location, setLocation] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [currentTab, setCurrentTab] = useState("home");
  const username = localStorage.getItem("username") || "User";
  
  const stateFeatures = {
  "punjab": [29.83, 75.64, 1, 402, 22, 0, 80.3, 8.38, 0.7, 8.6, 2.2, 65, 80, 368.0, 5.8, 0.84, 5.4, 9.2, 1, 84.4, 10, 22.8, 41.8, 47.3, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "assam": [25.74, 90.24, 0, 505, 22, 0, 17.8, 6.34, 21.1, 2.9, 10.1, 2819, 7373, 1569.7, 31.4, 1.63, 42.7, 42.4, 1, 7.9, 11, 27.6, 32.5, 59.3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "uttar pradesh": [24.98, 77.80, 0, 727, 43, 0, 99.5, 7.58, 7.6, 12.5, 3.6, 61, 34, 196.5, 19.8, 0.19, 9.9, 11.8, 1, 67.4, 10, 20.2, 20.2, 50.8, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "madhya pradesh": [24.54, 78.02, 0, 308, 23, 0, 38.8, 6.51, 15.1, 5.0, 16.3, 2206, 4995, 1326.5, 63.1, 1.54, 28.2, 37.5, 1, 6.9, 9, 27.8, 510.6, 81.0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "tamil nadu": [9.41, 79.54, 0, 794, 29, 1, 66.3, 8.08, 4.5, 8.3, 3.8, 79, 102, 385.7, 5.8, 0.56, 7.0, 8.7, 1, 51.2, 2, 27.2, 41.9, 67.5, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "kerala": [12.76, 75.09, 1, 935, 1, 0, 77.3, 8.28, 4.9, 11.1, 3.9, 12, 273, 82.1, 16.0, 0.35, 9.4, 14.4, 1, 77.3, 10, 29.2, 165.2, 77.3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "telangana": [19.12, 78.89, 1, 578, 20, 0, 37.6, 6.68, 26.2, 6.8, 25.0, 2300, 2486, 1429.7, 15.6, 0.87, 39.1, 47.3, 0, 14.2, 4, 41.5, 75.9, 59.4, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "mizoram": [21.88, 93.22, 1, 50, 4, 0, 22.7, 7.0, 31.0, 5.9, 17.3, 871, 1079, 922.3, 42.1, 1.7, 36.2, 67.2, 1, 38.0, 11, 23.5, 74.5, 71.5, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "delhi": [28.44, 77.00, 1, 10821, 29, 1, 87.3, 7.96, 5.7, 10.5, 2.5, 25, 203, 155.1, 5.0, 0.63, 6.8, 10.9, 1, 76.4, 7, 30.1, 424.2, 76.2, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "jharkhand": [23.36, 85.35, 0, 583, 23, 0, 30.4, 6.62, 39.0, 3.7, 18.9, 4586, 7528, 1270.4, 70.9, 1.12, 33.4, 91.5, 0, 22.3, 5, 44.6, 37.2, 52.6, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "uttarakhand": [30.86, 77.51, 1, 269, 32, 0, 14.2, 7.01, 44.3, 6.0, 20.6, 1817, 5241, 1016.8, 40.7, 1.83, 61.1, 65.9, 0, 14.3, 4, 40.4, 22.6, 25.2, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "goa": [15.66, 73.77, 1, 414, 19, 1, 89.0, 7.94, 2.6, 11.4, 0.6, 93, 174, 211.0, 9.6, 0.99, 3.3, 11.7, 0, 55.9, 6, 30.6, 692.9, 84.4, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "karnataka": [17.80, 74.01, 0, 415, 1, 0, 20.2, 7.4, 16.4, 6.8, 11.8, 2291, 5048, 692.5, 36.3, 0.76, 26.1, 60.0, 1, 18.7, 8, 27.8, 666.4, 83.2, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "rajasthan": [25.05, 72.17, 1, 365, 40, 0, 18.0, 7.61, 22.6, 6.5, 13.8, 2741, 4050, 1049.7, 43.8, 2.02, 21.7, 54.1, 1, 27.5, 11, 30.0, 37.7, 45.8, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "maharashtra": [21.44, 74.45, 1, 483, 14, 0, 27.4, 7.67, 13.3, 4.7, 21.8, 1530, 2917, 1299.5, 51.9, 0.46, 12.0, 64.8, 0, 19.0, 11, 30.0, 30.4, 41.5, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "haryana": [30.25, 75.64, 1, 478, 26, 0, 37.7, 7.5, 14.0, 3.8, 16.9, 1653, 2838, 692.9, 43.4, 0.36, 10.6, 87.8, 0, 26.5, 3, 47.4, 34.6, 45.1, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "odisha": [20.03, 82.60, 1, 387, 12, 1, 23.1, 6.78, 24.8, 6.7, 8.1, 626, 3445, 338.4, 56.7, 1.48, 15.4, 25.2, 0, 26.2, 10, 23.0, 75.5, 73.3, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "west bengal": [22.55, 86.68, 0, 799, 19, 0, 38.4, 7.13, 25.7, 5.5, 19.9, 1713, 2753, 679.0, 21.3, 1.33, 12.7, 49.7, 0, 5.0, 8, 31.2, 299.0, 78.4, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "bihar": [25.05, 84.08, 0, 1179, 13, 1, 35.5, 7.49, 25.8, 4.1, 21.3, 3272, 4725, 678.1, 49.1, 0.63, 13.0, 50.1, 0, 10.4, 2, 20.5, 11.9, 39.0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "andhra pradesh": [14.02, 80.89, 1, 376, 20, 1, 72.1, 7.59, 3.9, 12.3, 4.7, 60, 162, 389.7, 18.3, 0.78, 2.4, 7.9, 1, 98.9, 7, 34.3, 663.4, 89.8, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "himachal pradesh": [31.86, 78.03, 0, 191, 54, 1, 78.5, 8.24, 7.6, 11.6, 4.6, 66, 160, 224.7, 6.8, 0.1, 6.8, 2.9, 1, 58.4, 1, 12.9, 6.7, 56.7, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "jammu and kashmir": [34.49, 76.05, 1, 70, 52, 1, 61.2, 6.94, 6.7, 11.6, 1.4, 77, 43, 116.4, 18.4, 0.28, 2.2, 10.0, 1, 78.4, 11, 28.0, 41.5, 64.6, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "tripura": [23.83, 92.19, 1, 440, 83, 1, 89.3, 8.35, 0.7, 7.8, 1.6, 26, 279, 306.7, 15.6, 0.75, 7.6, 3.2, 1, 85.9, 1, 12.7, 9.1, 47.7, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "manipur": [24.20, 94.11, 0, 179, 7, 0, 33.5, 7.57, 18.3, 4.2, 14.3, 1367, 1558, 956.2, 30.4, 0.74, 21.5, 63.6, 1, 28.1, 10, 27.4, 49.0, 65.2, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "arunachal pradesh": [28.50, 92.99, 0, 49, 34, 1, 69.1, 8.25, 1.4, 7.8, 0.3, 34, 292, 116.3, 1.3, 0.08, 4.8, 6.8, 1, 93.1, 11, 21.0, 30.1, 56.1, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "chhattisgarh": [20.70, 83.08, 0, 180, 16, 0, 26.1, 7.12, 33.0, 4.5, 21.7, 3582, 8698, 825.8, 16.4, 1.07, 39.3, 66.2, 1, 21.7, 5, 37.3, 7.9, 43.0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "chandigarh": [30.63, 76.89, 1, 9293, 10, 0, 23.0, 6.57, 21.4, 5.0, 12.5, 2486, 5316, 577.8, 69.3, 0.69, 24.3, 49.0, 0, 6.8, 8, 33.0, 103.7, 82.3, 1, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "puducherry": [11.89, 79.62, 1, 2185, 12, 0, 28.1, 6.3, 31.7, 3.7, 15.4, 2281, 7714, 1148.0, 46.4, 2.14, 57.1, 87.6, 0, 16.9, 12, 23.1, 45.2, 45.7, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "hyderabad": [17.38, 78.48, 1, 18000, 25, 0, 15.4, 6.12, 45.8, 3.1, 32.5, 4850, 9200, 1650.0, 68.4, 2.45, 52.1, 45.5, 0, 8.5, 7, 28.2, 510.5,92.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
  "jhansi": [24.9883, 77.8044, 0, 727, 43, 0, 99.5, 7.58, 7.6, 12.5, 3.6, 61, 34, 196.5, 19.8, 0.19, 9.9, 11.8, 1, 67.4, 10, 20.2, 20.2, 50.8, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "maharajganj": [28.3761, 79.2449, 1, 897, 51, 1, 93.4, 7.65, 5.9, 9.3, 3.6, 68, 84, 470.4, 5.3, 0.79, 5.0, 7.1, 1, 79.6, 2, 13.0, 28.4, 38.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "pratapgarh": [25.1959, 77.6195, 1, 604, 40, 0, 81.3, 7.1, 4.3, 10.6, 4.8, 95, 89, 495.4, 9.8, 0.53, 9.2, 1.2, 0, 54.2, 3, 37.2, 41.1, 36.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "sonbhadra": [29.2322, 78.126, 1, 1382, 55, 0, 61.6, 8.39, 3.1, 11.1, 1.0, 59, 137, 427.0, 7.0, 0.24, 6.0, 3.9, 1, 66.9, 6, 28.6, 275.3, 89.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "ambedkar nagar": [28.0132, 80.6267, 1, 651, 39, 0, 36.1, 6.8, 22.4, 5.6, 27.4, 3854, 8537, 427.1, 49.9, 2.34, 61.9, 68.5, 0, 17.4, 3, 36.0, 25.5, 40.2, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  "shahjahanpur": [23.635, 81.6398, 1, 1176, 15, 1, 39.6, 6.8, 18.9, 4.6, 10.5, 427, 2346, 306.1, 54.1, 1.16, 6.3, 23.9, 0, 14.9, 12, 7.7, 29.8, 38.2, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "varanasi": [28.7153, 79.4034, 1, 763, 12, 0, 25.5, 6.92, 37.8, 5.2, 13.2, 3230, 2208, 797.6, 41.7, 0.34, 36.4, 66.6, 1, 9.5, 11, 26.0, 46.8, 52.9, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "etawah": [24.9953, 84.0851, 0, 1328, 33, 1, 19.8, 7.47, 10.7, 4.6, 12.1, 1835, 4633, 661.8, 21.4, 1.17, 7.3, 45.3, 1, 31.9, 8, 29.7, 361.2, 79.9, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  "kushinagar": [28.903, 78.7869, 1, 953, 34, 0, 34.2, 7.63, 29.5, 6.0, 19.9, 538, 1718, 1362.1, 67.1, 2.29, 16.6, 48.9, 0, 5.7, 9, 32.3, 308.2, 94.1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "lucknow": [28.8276, 81.3153, 0, 672, 48, 0, 88.8, 7.26, 4.4, 12.6, 3.2, 43, 58, 299.3, 6.2, 0.46, 3.7, 9.3, 1, 79.7, 2, 10.7, 25.4, 37.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "agra": [27.1767, 78.0081, 1, 1050, 29, 1, 96.2, 7.42, 1.2, 11.5, 1.2, 45, 110, 250.5, 4.2, 0.15, 2.1, 4.5, 1, 94.2, 1, 42.1, 12.5, 25.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "gorakhpur": [26.7606, 83.3731, 1, 1240, 12, 0, 18.4, 6.55, 42.1, 3.2, 28.5, 4200, 9100, 612.4, 58.2, 2.85, 55.1, 72.4, 0, 12.1, 8, 28.2, 345.8, 92.5, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  "meerut": [28.9845, 77.7064, 0, 890, 45, 1, 82.1, 7.21, 4.8, 9.8, 2.4, 68, 142, 315.2, 11.4, 0.31, 5.6, 8.2, 1, 78.4, 4, 24.5, 35.2, 55.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "mirzapur": [25.1337, 82.5644, 1, 1125, 32, 0, 31.2, 7.85, 24.3, 5.1, 14.8, 850, 2840, 510.8, 42.5, 1.95, 12.8, 38.2, 0, 8.4, 7, 30.1, 290.4, 85.6, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  "prayagraj": [25.4358, 81.8463, 1, 980, 22, 1, 88.5, 7.12, 3.1, 12.8, 3.5, 52, 95, 410.2, 8.4, 0.22, 4.8, 6.1, 1, 85.3, 5, 15.2, 18.4, 42.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "mathura": [27.4924, 77.6737, 1, 710, 58, 0, 42.6, 8.12, 14.5, 4.8, 9.2, 380, 1850, 850.4, 38.6, 1.42, 22.4, 25.8, 0, 22.5, 10, 39.5, 10.2, 32.8, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "azamgarh": [26.0711, 83.1861, 1, 1350, 19, 0, 28.4, 6.95, 28.5, 4.1, 18.2, 3100, 2400, 412.5, 45.2, 2.15, 48.2, 55.3, 0, 15.2, 6, 29.1, 310.5, 88.4, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "bareilly": [28.3670, 79.4304, 0, 920, 34, 1, 92.3, 7.35, 2.1, 10.2, 1.8, 55, 120, 340.5, 6.5, 0.25, 4.1, 7.2, 1, 89.1, 3, 12.8, 22.4, 41.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "firozabad": [27.1513, 78.3953, 1, 880, 41, 0, 78.5, 7.55, 6.2, 9.1, 3.2, 110, 340, 512.4, 12.5, 0.45, 10.2, 12.4, 1, 72.4, 5, 40.5, 14.2, 30.5, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  "ayodhya": [26.7922, 82.1998, 1, 1150, 27, 1, 85.4, 7.25, 3.8, 11.8, 2.1, 62, 105, 290.8, 9.2, 0.18, 5.4, 8.1, 1, 81.5, 4, 22.5, 40.1, 58.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "ghaziabad": [28.6692, 77.4538, 0, 1450, 32, 1, 94.8, 7.2, 1.1, 10.5, 1.5, 40, 90, 280.4, 5.1, 0.12, 3.2, 6.4, 1, 91.2, 4, 32.5, 15.0, 45.2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "kanpur": [26.4499, 80.3319, 0, 1100, 45, 1, 72.1, 7.4, 5.8, 8.2, 4.1, 180, 450, 410.5, 14.2, 0.35, 12.1, 15.8, 1, 76.5, 5, 30.2, 22.4, 55.6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "kanpur dehat": [26.4697, 79.7498, 1, 720, 38, 0, 35.4, 7.9, 15.2, 4.5, 12.6, 620, 1450, 720.1, 42.1, 1.85, 25.4, 34.1, 0, 24.5, 6, 29.8, 280.5, 82.1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
};



  const predictLocation = async () => {
    const searchKey = location.toLowerCase().trim();
  const features = stateFeatures[searchKey];

  if (!features) {
    alert("Location not found in database. Try Lucknow, Kanpur, Ghaziabad or Delhi.");
    return;
  }
  try {
  const res = await axios.post("http://localhost:5000/predict_location", { features });

    setConfidence(res.data.confidence);

  } catch (err) {
    alert("Prediction failed");
  }
};
  const chartData = {
    labels: ["Risk Level"],
    datasets: [
      {
        label: "Confidence %",
        data: [confidence],
        backgroundColor: ["blue"]
      }
    ]
  };

  const chartOptions = {
  scales: {
    y: {
      min: 0,   
      max: 100, 
      ticks: {
        stepSize: 10 
      }
    }
  },
  maintainAspectRatio: true 
};

  return (
    <div style={styles.dashboardWrapper}>
      {/* SIDEBAR SECTION */}
      <div style={styles.sidebar}>
        <div style={styles.profileBox}>
          <div style={styles.avatar}>👤</div>
          <h3 style={{color: "white"}}>{username}</h3>
        </div>
        <nav style={styles.nav}>
          <button style={currentTab === "home" ? styles.activeNavBtn : styles.navBtn} onClick={() => setCurrentTab("home")}>🏠 Home</button>
          <button style={currentTab === "help" ? styles.activeNavBtn : styles.navBtn} onClick={() => setCurrentTab("help")}>📞 Help & Support</button>
          <button style={currentTab === "about" ? styles.activeNavBtn : styles.navBtn} onClick={() => setCurrentTab("about")}>ℹ️ About & Health</button>
        </nav>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div style={styles.mainContent}>
        
        {/* TAB: HOME */}
        {currentTab === "home" && (
          <div style={styles.homeGrid}>
            <div style={styles.card}>
              <h2>Water Borne Disease Prediction</h2>
              <input
                placeholder="Enter Location (Delhi, Punjab)"
                onChange={(e) => setLocation(e.target.value)}
                style={styles.input}
              />
              <button onClick={predictLocation} style={styles.predictBtn}>Predict</button>
              <h3>Confidence: {confidence}%</h3>
              {confidence > 60 && <div style={styles.alert}>⚠️ High Risk Area</div>}
              {confidence > 0 && <Bar data={chartData} options={chartOptions} />}
            </div>

            {/* SYMPTOMS BASED PREDICTION */}
            <div style={styles.card}>
              <Symptoms />
            </div>
          </div>
        )}

        {/* TAB: HELP & SUPPORT */}
        {currentTab === "help" && (
  <div style={styles.cardFull}>
    <h2>Hospitals in Ghaziabad</h2>
    <div style={styles.tableResponsive}> 
      <table style={styles.table}>
        <thead>
          <tr style={{background: "#f2f2f2"}}>
            <th style={styles.th}>Hospital Name</th>
            <th style={styles.th}>Contact Number</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={styles.td}>Max Super Speciality Hospital, Vaishali</td><td style={styles.td}>0120 418 3000</td></tr>
          <tr><td style={styles.td}>Yashoda Super Speciality Hospital</td><td style={styles.td}>0120 418 1900</td></tr>
          <tr><td style={styles.td}>Manipal Hospital (Columbia Asia)</td><td style={styles.td}>0120 271 2231</td></tr>
          <tr><td style={styles.td}>Narendra Mohan Foundation</td><td style={styles.td}>0120 265 7501</td></tr>
        </tbody>
      </table>
    </div>
  </div>
)}

        {/* TAB: ABOUT SECTION */}
        {currentTab === "about" && (
          <div style={styles.cardFull}>
            <h2>About Water Borne Diseases</h2>
            <p>Water-borne diseases are caused by pathogenic microorganisms that are most commonly transmitted in contaminated fresh water.</p>
            
            <h3>Precautions</h3>
            <ul style={{textAlign: "left", display: "inline-block"}}>
              <li>Boil water before drinking or use RO filters.</li>
              <li>Always wash hands before handling food.</li>
              <li>Avoid eating raw or street food during monsoon season.</li>
              <li>Ensure proper sanitation and sewage disposal.</li>
            </ul>

            <h3>Health Monitoring (HMEWS)</h3>
            <p>The Health Monitoring and Early Warning System (HMEWS) tracks environmental factors and symptoms to provide early alerts regarding potential outbreaks.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  dashboardWrapper: { display: "flex", width: "100vw", height: "100vh", background: "#f5f5f5", overflow: "hidden" },

  sidebar: { width: "250px",minWidth: "250px", flexShrink: 0, background: "#2c3e50", display: "flex", flexDirection: "column", padding: "20px", height: "100vh", boxSizing: "border-box" },

  profileBox: { textAlign: "center", marginBottom: "30px", borderBottom: "1px solid #444", paddingBottom: "20px" },

  avatar: { fontSize: "50px", marginBottom: "10px" },

  nav: { display: "flex", flexDirection: "column", gap: "10px" },

  navBtn: { padding: "12px", background: "transparent", color: "white", border: "none", textAlign: "left", cursor: "pointer", fontSize: "16px" },

  activeNavBtn: { padding: "12px", background: "#34495e", color: "white", border: "none", textAlign: "left", cursor: "pointer", fontSize: "16px", fontWeight: "bold", borderRadius: "5px" },

  mainContent: { flexGrow: 1, padding: "30px", overflowY: "auto", boxSizing: "border-box" },

  tableResponsive: {
    width: "100%",
    overflowX: "auto",    
    marginTop: "20px"
  },
  
  
  homeGrid: { 
    display: "grid", 
    gridTemplateColumns: "1fr 1fr", 
    gap: "20px",
    alignItems: "flex-start" 
  },
  
  card: { padding: "25px", background: "white", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center" },
  
  symptomsWrapper: { background: "transparent" }, 

  cardFull: { padding: "40px", background: "white", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", textAlign: "center", overflowX: "auto" },

  input: { width: "100%", padding: "10px", margin: "10px 0", boxSizing: "border-box" },

  predictBtn: { width: "100%", padding: "10px", background: "green", color: "white", border: "none", cursor: "pointer" },

  alert: { color: "red", fontWeight: "bold", margin: "10px 0" },

  table: { width: "100%", borderCollapse: "collapse" },

  th: { padding: "12px", border: "1px solid #ddd", textAlign: "left" },

  td: { padding: "12px", border: "1px solid #ddd", textAlign: "left" }
};

export default Dashboard;
