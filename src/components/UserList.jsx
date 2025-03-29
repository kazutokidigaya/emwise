import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto  max-w-7xl p-10 ">
      <div className=" flex flex-col md:flex-row justify-start items-center mb-4 gap-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Users List</h1>

        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative w-90">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <div className="max-w-6xl">
          <Button className="w-full my-4 border-[2px] border-gray-200">
            <Loader2 className="mr-2 h-4 w-4 animate-spin  " />
            Please wait...
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredUsers.map((user) => (
              <div
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-3 "
                key={user.id}
              >
                <div className="flex flex-col items-center pb-10">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                  />

                  <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    {user.first_name} {user.last_name}
                  </h5>

                  <div className="flex mt-4 md:mt-6">
                    <button
                      onClick={() =>
                        navigate(`/edit/${user.id}`, { state: user })
                      }
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-600 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center mt-6 space-x-4">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500  border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  ${
                    page === 1 ? "bg-gray-300" : "bg-white text-black"
                  }`}
                >
                  Previous
                </button>
              </li>
              <li>
                <p className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                  Page {page} of {totalPages}
                </p>
              </li>

              <li>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700  ${
                    page === totalPages ? "bg-gray-300" : "bg-white text-black"
                  }`}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
