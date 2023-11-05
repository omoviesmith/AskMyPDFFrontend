import { useEffect, useState } from "react";
import classNames from "classnames";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

//
import { FiUploadCloud } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";

/**
 *
 */
export default function FileUploadPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  //
  const [inputFileUrl, setInputFileUrl] = useState<string>("");
  const [submitProgress, setSubmitProgress] = useState<number>(20);
  const [uploadMode, setUploadMode] = useState<"file" | "url">("file");

  //
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  //
  const mutation = useMutation({
    mutationFn: () => {
      setSubmitProgress(0);

      //
      const formItem = new FormData();
      for (const file of acceptedFiles) {
        formItem.set("input_pdf_file", file);
      }

      return axiosInstance.post(`/upload_ocr`, formItem, {
        onUploadProgress: (progressEvent) => {
          console.log({ progressEvent });
          const percentCompleted = Math.max(
            Math.min(
              Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 100),
              ),
              100,
            ),
            0,
          );
          setSubmitProgress(percentCompleted);
        },
      });
    },
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: () => {
      toast.error("Unable to update the file");
    },
  });

  const isSubmitting = mutation.isPending;

  //
  useEffect(() => {
    if (!acceptedFiles.length) return;
    mutation.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  //
  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-100 p-2 md:p-5 lg:p-20">
      <div className="flex h-full w-full flex-col rounded-xl bg-white py-2 shadow-lg md:py-5 lg:py-10">
        {/* Header */}
        <div className="flex justify-between gap-20 border-b border-gray-200 px-2 pb-2 md:px-5 md:pb-5 lg:px-10 lg:pb-10">
          <p className="text-4xl font-semibold">
            {t("fileUpload.uploadDocuments")}
          </p>

          <p className="max-w-md text-center text-sm">
            {t("fileUpload.limitHint")}
          </p>
        </div>

        {isSubmitting && (
          <div className="h-full flex-grow">
            <div className="flex h-full flex-col items-center justify-center px-2 py-10 md:px-5 lg:px-10">
              <div className="h-5 w-full overflow-hidden rounded-full border border-gray-300 bg-gray-100 shadow">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${submitProgress}%` }}
                />
              </div>

              <div className="my-5">
                {submitProgress < 100 ? (
                  <span>{t("fileUpload.uploading")}</span>
                ) : (
                  <span>{t("fileUpload.processing")}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {!isSubmitting && (
          <div className="flex-grow">
            {/* Mode switch */}
            <div className="mt-10 px-2 md:px-5 lg:px-10">
              <div className=" max-w-fit rounded-full bg-gray-200 p-[5px]">
                <button
                  onClick={() => setUploadMode("file")}
                  className={classNames("rounded-full px-5 py-3 text-sm", {
                    "bg-white font-semibold shadow": uploadMode === "file",
                  })}
                >
                  {t("fileUpload.uploadFromFile")}
                </button>
                <button
                  onClick={() => setUploadMode("url")}
                  className={classNames("rounded-full px-5 py-3 text-sm", {
                    "bg-white font-semibold shadow": uploadMode === "url",
                  })}
                >
                  {t("fileUpload.uploadFromUrl")}
                </button>
              </div>
            </div>

            {/* Actual dropzone */}
            {uploadMode === "file" && (
              <div className="p-2 md:p-5 lg:p-10">
                <div
                  {...getRootProps({
                    className:
                      "flex h-60 cursor-pointer items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5",
                  })}
                >
                  <input {...getInputProps()} />

                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-5 rounded-full bg-gray-100 p-3">
                      <div className="rounded-full bg-gray-200 p-3 text-gray-600">
                        <FiUploadCloud size={32} />
                      </div>
                    </div>

                    <p className="text-sm">{t("fileUpload.uploadHint")}</p>
                    <p className="mt-1 text-xs">
                      {t("fileUpload.supportedFormats", {
                        formats: "'.pdf', '.txt', '.csv'",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* File ULR input */}
            {uploadMode === "url" && (
              <div className="w-full p-2 md:p-5 lg:p-10">
                <input
                  onChange={(e) => setInputFileUrl(e.target.value)}
                  className="w-full rounded border-gray-300 bg-gray-50 focus:border-blue-300 focus:ring-blue-300"
                />

                <div className="mt-10 flex w-full justify-end">
                  <button
                    disabled={!inputFileUrl}
                    onClick={() => navigate("/conversations/1")}
                    className="flex items-center gap-3 rounded-md bg-gray-900 px-6 py-3 text-sm text-gray-100 shadow transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:scale-100"
                  >
                    {t("fileUpload.startConversation")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* More content */}
        <div className="px-2 text-sm md:px-5 lg:px-10">
          <p>{t("fileUpload.agreeWith")}</p>

          <div className="flex gap-1">
            <a href="#" className="font-semibold hover:underline">
              {t("general.privacyPolicy")}
            </a>
            <p>&</p>
            <a href="#" className="font-semibold hover:underline">
              {t("general.terms")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
