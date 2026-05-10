"use client";

import { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, ImagePlus, Star } from "lucide-react";
import {
  createService,
  updateService,
  uploadServiceImage,
  deleteServiceImage,
  setPrimaryImage,
} from "./actions";
import type { Activity, ActivityImage, Category } from "@prisma/client";

type Props = {
  categories: Category[];
  activity?: Activity & {
    images: ActivityImage[];
    includes: { id: string; item: string }[];
    excludes: { id: string; item: string }[];
  };
};

export function ActivityForm({ categories, activity }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [uploadPending, startUpload] = useTransition();
  const [includes, setIncludes] = useState<string[]>(
    activity?.includes.map((i) => i.item) ?? [""]
  );
  const [excludes, setExcludes] = useState<string[]>(
    activity?.excludes.map((e) => e.item) ?? [""]
  );
  const [images, setImages] = useState<ActivityImage[]>(
    activity?.images ?? []
  );
  const [feedback, setFeedback] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function addItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    setter((prev) => [...prev, ""]);
  }

  function updateItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    val: string
  ) {
    setter((prev) => prev.map((p, i) => (i === index ? val : p)));
  }

  function removeItem(
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) {
    setter((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // includes / excludes added individually
    includes.forEach((v) => fd.append("includes", v));
    excludes.forEach((v) => fd.append("excludes", v));

    startTransition(async () => {
      if (activity) {
        await updateService(activity.id, fd);
        setFeedback("Saved!");
        setTimeout(() => setFeedback(""), 3000);
      } else {
        await createService(fd);
      }
    });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!activity || !e.target.files?.[0]) return;
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append("image", file);
    fd.append("isPrimary", images.length === 0 ? "true" : "false");

    startUpload(async () => {
      await uploadServiceImage(activity.id, fd);
      // Refresh images list (simple reload approach)
      router.refresh();
    });
  }

  async function handleDeleteImage(imageId: string) {
    if (!activity) return;
    await deleteServiceImage(imageId, activity.id);
    setImages((prev) => prev.filter((img) => img.id !== imageId));
    router.refresh();
  }

  async function handleSetPrimary(imageId: string) {
    if (!activity) return;
    await setPrimaryImage(imageId, activity.id);
    router.refresh();
  }

  const inputCls =
    "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white";
  const labelCls = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {activity ? "Edit Activity" : "New Activity"}
          </h1>
          {activity && (
            <p className="text-sm text-gray-400 mt-0.5">/{activity.slug}</p>
          )}
        </div>
        {feedback && (
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full">
            {feedback}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Images Section — only for existing activities */}
        {activity && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Images</h2>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadPending}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition disabled:opacity-60"
              >
                {uploadPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImagePlus className="w-4 h-4" />
                )}
                Upload Image
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {images.length === 0 ? (
              <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center">
                <ImagePlus className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No images uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border-2 border-transparent hover:border-emerald-300 transition"
                  >
                    <Image
                      src={img.imageUrl}
                      alt="Activity"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {img.isPrimary && (
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500 text-white rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Main
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                      {!img.isPrimary && (
                        <button
                          type="button"
                          onClick={() => handleSetPrimary(img.id)}
                          className="p-1.5 bg-white/20 hover:bg-white/40 rounded-lg transition text-white text-xs"
                          title="Set as main"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(img.id)}
                        className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-lg transition text-white"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Activity Name *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    defaultValue={activity?.name}
                    placeholder="e.g. Buggy Car Adventure"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Category *</label>
                  <select
                    name="categoryId"
                    required
                    defaultValue={activity?.categoryId}
                    className={inputCls}
                  >
                    <option value="">Select category…</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Status *</label>
                  <select
                    name="status"
                    required
                    defaultValue={activity?.status ?? "DRAFT"}
                    className={inputCls}
                  >
                    <option value="DRAFT">Draft (hidden)</option>
                    <option value="PUBLISHED">Published (live)</option>
                  </select>
                </div>

                <div>
                  <label className={labelCls}>Price (USD) *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                      $
                    </span>
                    <input
                      name="price"
                      type="number"
                      required
                      min={0}
                      step={0.01}
                      defaultValue={
                        activity ? (activity.price / 100).toFixed(2) : ""
                      }
                      placeholder="0.00"
                      className={`${inputCls} pl-8`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Duration *</label>
                  <input
                    name="duration"
                    type="text"
                    required
                    defaultValue={activity?.duration}
                    placeholder="e.g. 4 hours, Full day"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>YouTube Video ID</label>
                  <input
                    name="youtubeVideoId"
                    type="text"
                    defaultValue={activity?.youtubeVideoId ?? ""}
                    placeholder="e.g. dQw4w9WgXcQ"
                    className={inputCls}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    The part after ?v= in the YouTube URL
                  </p>
                </div>
              </div>

              <div>
                <label className={labelCls}>Short Description *</label>
                <textarea
                  name="shortDescription"
                  required
                  rows={2}
                  defaultValue={activity?.shortDescription}
                  placeholder="1-2 sentence teaser shown in the cards"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div>
                <label className={labelCls}>Full Description *</label>
                <textarea
                  name="description"
                  required
                  rows={6}
                  defaultValue={activity?.description}
                  placeholder="Detailed description shown on the activity detail page…"
                  className={`${inputCls} resize-y`}
                />
              </div>
            </section>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                  What&apos;s Included
                </h2>
                <div className="space-y-2">
                  {includes.map((val, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        name="dummy_includes"
                        type="text"
                        value={val}
                        onChange={(e) =>
                          updateItem(setIncludes, i, e.target.value)
                        }
                        placeholder="e.g. Snorkeling gear"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(setIncludes, i)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addItem(setIncludes)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-emerald-600 hover:text-emerald-500 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add item
                </button>
              </section>

              <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-4">
                  What&apos;s Not Included
                </h2>
                <div className="space-y-2">
                  {excludes.map((val, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        name="dummy_excludes"
                        type="text"
                        value={val}
                        onChange={(e) =>
                          updateItem(setExcludes, i, e.target.value)
                        }
                        placeholder="e.g. Personal insurance"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(setExcludes, i)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addItem(setExcludes)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-rose-500 hover:text-rose-400 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add item
                </button>
              </section>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl transition shadow-lg shadow-emerald-500/20 disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving…
                  </>
                ) : activity ? (
                  "Save Changes"
                ) : (
                  "Create Activity"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
