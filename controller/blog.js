import axios from "axios";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/error.js";

export const getBlogStats = catchAsyncError(async (req, res) => {
      // Make an HTTP GET request using axios
      const { data:{blogs}, status } = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                  'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
      });

      if (status !== 200) {
            return new ErrorHandler("HTTP Error", status)
      }

      // Perform data analysis

      // - Calculate the total number of blogs fetched.
      const totalBlogs = blogs.length;


      // - Find the blog with the longest title.
      let longestTitle = "";
      let blogWithLongestTitle = null;

      for (let i = 0; i < blogs.length; i++) {
            if (blogs[i].title.length > longestTitle.length) {
                  longestTitle = blogs[i].title;
                  blogWithLongestTitle = blogs[i];
            }
      }


      // - Determine the number of blogs with titles containing the word "privacy."
      const blogsWithPrivacyTitle = blogs.filter((element) => {
            return element.title.toLowerCase().includes("privacy")
      });


      // - Create an array of unique blog titles (no duplicates).
      const uniqueBlogTitles = [];

      for (let i = 0; i < blogs.length; i++) {
            if (!uniqueBlogTitles.includes(blogs[i].title)) {
                  uniqueBlogTitles.push(blogs[i].title)
            }
      }

      //  Create a response object
      const responseData = {
            totalBlogs,
            analytics: {
                  longestTitle,
                  blogWithLongestTitle,
                  blogsWithPrivacyTitle: blogsWithPrivacyTitle.length,
                  uniqueBlogTitles
            }
      };

      res.status(200).json({
            success: true,
            responseData
      });

});

export const getSerchResult = catchAsyncError(async (req, res) => {
      const query = req.query.query; // Get the query parameter from the request

      if (!query) {
            return new ErrorHandler('Query parameter "query" is missing', 400)
      }

      // Make an HTTP GET request using axios
      const { data:{blogs},status } = await axios.get('https://intent-kit-16.hasura.app/api/rest/blogs', {
            headers: {
                  'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
            }
      });

      if (status !== 200) {
            return new ErrorHandler("HTTP Error", status)
      }

      // Implement the search functionality (case-insensitive)
      const searchResults = blogs.filter((element) =>
            element.title.toLowerCase().includes(query.toLowerCase())
      );

      res.status(200).json({
            success: true,
            searchResults
      });
})