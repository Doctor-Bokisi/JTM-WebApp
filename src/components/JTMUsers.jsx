"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import axiosInstance from "../API/axios-config";

const loadJQueryAndDataTables = async () => {
  const $ = (await import("jquery")).default;
  await import("datatables.net-dt/js/dataTables.dataTables.js");
  return $;
};

const JTMUsersLayer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableInitialized, setTableInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axiosInstance.get("/api/Users/GetAllUser");
        setData(response.data);
      } catch (err) {
        console.error("API Call Failed:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && !tableInitialized) {
      let table;
      loadJQueryAndDataTables()
        .then(($) => {
          window.$ = window.jQuery = $;
          table = $("#dataTable").DataTable({
            pageLength: 10,
            destroy: true, // Ensure reinitialization doesn't conflict
          });
          setTableInitialized(true);
        })
        .catch((error) => {
          console.error("Error loading jQuery or DataTables:", error);
        });

      return () => {
        if (table) {
          table.destroy(true);
        }
      };
    }
  }, [data]); // Runs only when data is updated

  return (
    <div className="card basic-data-table">
      <div className="card-header">
        <h5 className="card-title mb-0">JTM Users</h5>
      </div>
      <div className="card-body">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <table className="table bordered-table mb-0" id="dataTable">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check style-check d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">S.L</label>
                  </div>
                </th>
                <th scope="col">UserName</th>
                <th scope="col">Email</th>
                <th scope="col">Date Joined</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((user, index) => (
                  <tr key={user.id}>
                    <td>
                      <div className="form-check style-check d-flex align-items-center">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label">
                          {String(index + 1).padStart(2, "0")}
                        </label>
                      </div>
                    </td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.dateJoined).toLocaleDateString()}</td>
                    <td>
                      <Link
                        href="#"
                        className="w-32-px h-32-px me-8 bg-primary-light text-primary-600 rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <Icon icon="iconamoon:eye-light" />
                      </Link>
                      <Link
                        href="#"
                        className="w-32-px h-32-px me-8 bg-success-focus text-success-main rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <Icon icon="lucide:edit" />
                      </Link>
                      <Link
                        href="#"
                        className="w-32-px h-32-px me-8 bg-danger-focus text-danger-main rounded-circle d-inline-flex align-items-center justify-content-center"
                      >
                        <Icon icon="mingcute:delete-2-line" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default JTMUsersLayer;
