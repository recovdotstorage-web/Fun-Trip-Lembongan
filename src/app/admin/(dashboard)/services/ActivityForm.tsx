"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Loader2, ImagePlus, Star, X, Info, Users } from "lucide-react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import {
  createService,
  updateService,
  uploadServiceImage,
  deleteServiceImage,
  setPrimaryImage,
} from "./actions";
import type { Activity, ActivityImage, ActivityPriceTier, Category } from "@prisma/client";

type Props = {
  categories: Category[];
  activity?: Activity & {
    images: ActivityImage[];
    includes: { id: string; item: string }[];
    excludes: { id: string; item: string }[];
    priceTiers: ActivityPriceTier[];
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

  // Price Tiers state
  interface PriceTierEntry {
    tierGroup: string;
    tierLabel: string;
    price: string; // stored as string for input, converted on submit
    sortOrder: number;
  }
  const [priceTiers, setPriceTiers] = useState<PriceTierEntry[]>(
    activity?.priceTiers.map((t) => ({
      tierGroup: t.tierGroup,
      tierLabel: t.tierLabel,
      price: (t.price / 100).toString(),
      sortOrder: t.sortOrder,
    })) ?? []
  );
  
  // Local state for new images (creation mode or adding before saving)
  const [localFiles, setLocalFiles] = useState<{ file: File; preview: string }[]>([]);
  
  const [feedback, setFeedback] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Delete Confirmation State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{ id?: string; localIndex?: number } | null>(null);
  const [deletePending, startDelete] = useTransition();
  const [youtubeId, setYoutubeId] = useState(activity?.youtubeVideoId ?? "");

  // Cleanup local previews
  useEffect(() => {
    return () => {
      localFiles.forEach((f) => URL.revokeObjectURL(f.preview));
    };
  }, [localFiles]);

  function addItem(setter: React.Dispatch<React.SetStateAction<string[]>>) {
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
    
    // Extract YouTube ID if it's a URL
    const cleanedYoutubeId = extractYoutubeId(youtubeId);
    fd.set("youtubeVideoId", cleanedYoutubeId);
    
    // includes / excludes added individually
    includes.forEach((v) => fd.append("includes", v));
    excludes.forEach((v) => fd.append("excludes", v));

    // price tiers as JSON
    const tiersPayload = priceTiers
      .filter((t) => t.tierGroup && t.tierLabel && t.price)
      .map((t, i) => ({
        tierGroup: t.tierGroup,
        tierLabel: t.tierLabel,
        price: Math.round(parseFloat(t.price) * 100),
        sortOrder: t.sortOrder ?? i,
      }));
    fd.set("priceTiers", JSON.stringify(tiersPayload));
    
    // add local files to the same formData for creation
    localFiles.forEach((lf) => fd.append("images", lf.file));

    startTransition(async () => {
      try {
        if (activity) {
          await updateService(activity.id, fd);
          setFeedback("Saved successfully!");
          setTimeout(() => setFeedback(""), 3000);
        } else {
          await createService(fd);
        }
      } catch (err: any) {
        // Next.js redirect is not an error, we must re-throw it so the router can redirect
        if (err.message && err.message.includes("NEXT_REDIRECT")) {
          throw err;
        }
        console.error(err);
      }
    });
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // If edit mode, upload immediately (existing behavior but improved)
    if (activity) {
      const file = files[0];
      const fd = new FormData();
      fd.append("image", file);
      fd.append("isPrimary", images.length === 0 ? "true" : "false");

      startUpload(async () => {
        try {
          await uploadServiceImage(activity.id, fd);
          router.refresh();
        } catch (err: any) {
          if (!err.message?.includes("NEXT_REDIRECT")) {
            alert("Upload failed.");
          }
        }
      });
    } else {
      // If creation mode, add to local files
      const newFiles = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setLocalFiles(prev => [...prev, ...newFiles]);
    }
    
    // Reset input
    e.target.value = "";
  }

  function handleDeleteImage(id?: string, localIndex?: number) {
    setImageToDelete({ id, localIndex });
    setIsDeleteModalOpen(true);
  }

  async function confirmDeleteImage() {
    if (!imageToDelete) return;

    if (imageToDelete.id && activity) {
      // Remote deletion
      startDelete(async () => {
        try {
          await deleteServiceImage(imageToDelete.id!, activity.id);
          setImages((prev) => prev.filter((img) => img.id !== imageToDelete.id));
          setIsDeleteModalOpen(false);
          setImageToDelete(null);
          router.refresh();
        } catch (err: any) {
          if (err.message?.includes("NEXT_REDIRECT")) {
            setIsDeleteModalOpen(false);
            return;
          }
          alert("Delete failed.");
        }
      });
    } else if (imageToDelete.localIndex !== undefined) {
      // Local deletion
      const index = imageToDelete.localIndex;
      URL.revokeObjectURL(localFiles[index].preview);
      setLocalFiles(prev => prev.filter((_, i) => i !== index));
      setIsDeleteModalOpen(false);
      setImageToDelete(null);
    }
  }

  async function handleSetPrimary(imageId: string) {
    if (!activity) return;
    try {
      await setPrimaryImage(imageId, activity.id);
      router.refresh();
    } catch (err: any) {
      if (!err.message?.includes("NEXT_REDIRECT")) {
        alert("Action failed.");
      }
    }
  }

  const inputCls =
    "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white shadow-sm hover:border-gray-300";
  const labelCls = "block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1";

  function fillDummyData() {
    const form = document.querySelector("form") as HTMLFormElement;
    if (!form) return;

    const dummyData: Record<string, string> = {
      name: "Private Snorkeling Adventure at Blue Lagoon",
      categoryId: categories[0]?.id || "",
      status: "PUBLISHED",
      price: "120",
      duration: "4 Hours",
      youtubeVideoId: "M7lc1UVf-VE",
      shortDescription: "Experience the crystal clear waters and vibrant marine life of Nusa Lembongan.",
      description: "Join us for an unforgettable snorkeling experience at the famous Blue Lagoon and Mangrove Point. We provide all the necessary equipment and a professional guide to ensure your safety and enjoyment. Our private boat tour allows you to explore the best spots at your own pace.",
    };

    Object.entries(dummyData).forEach(([key, val]) => {
      const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (input) {
        input.value = val;
      }
    });

    setIncludes(["Professional Snorkeling Gear", "Private Boat", "English Speaking Guide", "Drinking Water"]);
    setExcludes(["Hotel Pickup (Optional)", "Underwater Camera", "Lunch"]);
    setYoutubeId("M7lc1UVf-VE");
  }

  function extractYoutubeId(url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : url;
  }

  function handleYoutubeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setYoutubeId(e.target.value);
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <AdminHeader
        title={activity ? "Edit" : "New"}
        highlight={activity ? "Activity" : "Service"}
        subtitle={activity ? `Currently editing: /${activity.slug}` : "Add a new adventure to your catalog. Set pricing, duration, and details."}
        category="Service Inventory"
        backButton={{ href: "/admin/services" }}
      >
        {!activity && (
          <button
            type="button"
            onClick={fillDummyData}
            className="text-[10px] font-bold text-zinc-400 hover:text-zinc-900 uppercase tracking-[0.2em] border border-zinc-200 px-5 py-2.5 rounded-xl hover:bg-zinc-50 transition-all active:scale-95 h-fit self-end shadow-sm"
          >
            Fill Dummy
          </button>
        )}
        {feedback && (
          <div className="self-end mb-1">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-100 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {feedback}
            </span>
          </div>
        )}
      </AdminHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Details */}
        <div className="lg:col-span-7 space-y-8">
          <form id="activity-form" onSubmit={handleSubmit} className="space-y-8">
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Plus className="w-4 h-4 text-emerald-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Core Details
                </h2>
              </div>

              <div className="space-y-5">
                <div>
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

                <div className="grid grid-cols-2 gap-5">
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
                      <option value="DRAFT">Draft</option>
                      <option value="PUBLISHED">Published</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Price (USD) *</label>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm group-focus-within:text-emerald-600 transition-colors font-semibold">
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
                </div>

                <div>
                  <label className={labelCls}>YouTube Video URL / ID</label>
                  <div className="relative group">
                    <input
                      name="youtubeVideoId"
                      type="text"
                      value={youtubeId}
                      onChange={handleYoutubeChange}
                      placeholder="Paste YouTube URL or ID here..."
                      className={inputCls}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 group-focus-within:opacity-100 opacity-0 transition-opacity pointer-events-none text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      {extractYoutubeId(youtubeId).length === 11 ? "Valid ID" : "Invalid URL"}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-1">
                    <span className="font-bold">TIP:</span> You can paste the full URL (e.g., youtube.com/watch?v=...)
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                  <Star className="w-4 h-4 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                  Marketing Content
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelCls}>Short Description *</label>
                  <textarea
                    name="shortDescription"
                    required
                    rows={2}
                    defaultValue={activity?.shortDescription}
                    placeholder="Brief teaser shown on listing cards..."
                    className={`${inputCls} resize-none h-24`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Full Description *</label>
                  <textarea
                    name="description"
                    required
                    rows={6}
                    defaultValue={activity?.description}
                    placeholder="Full itinerary and details..."
                    className={`${inputCls} resize-y min-h-[200px]`}
                  />
                </div>
              </div>
            </section>

            {/* Includes / Excludes */}
            <div className="grid grid-cols-1 gap-6">
              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  What&apos;s Included
                </h2>
                <div className="space-y-3">
                  {includes.map((val, i) => (
                    <div key={i} className="flex gap-2 group">
                      <input
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
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition shrink-0 border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addItem(setIncludes)}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:border-emerald-200 hover:text-emerald-600 hover:bg-emerald-50/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </section>

              <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Exclusions
                </h2>
                <div className="space-y-3">
                  {excludes.map((val, i) => (
                    <div key={i} className="flex gap-2 group">
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          updateItem(setExcludes, i, e.target.value)
                        }
                        placeholder="e.g. Lunch"
                        className={inputCls}
                      />
                      <button
                        type="button"
                        onClick={() => removeItem(setExcludes, i)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition shrink-0 border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => addItem(setExcludes)}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:border-rose-200 hover:text-rose-600 hover:bg-rose-50/30 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Add Exclusion
                </button>
              </section>
            </div>

            {/* Price Tiers / Packages */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
                    Price Packages
                  </h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    Optional — for multi-tier pricing (e.g. Buggy rentals)
                  </p>
                </div>
              </div>

              {priceTiers.length > 0 && (
                <div className="space-y-4">
                  {priceTiers.map((tier, i) => (
                    <div
                      key={i}
                      className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Tier #{i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setPriceTiers((prev) => prev.filter((_, idx) => idx !== i))
                          }
                          className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Group
                          </label>
                          <input
                            type="text"
                            value={tier.tierGroup}
                            onChange={(e) =>
                              setPriceTiers((prev) =>
                                prev.map((t, idx) =>
                                  idx === i ? { ...t, tierGroup: e.target.value } : t
                                )
                              )
                            }
                            placeholder="e.g. 4-Seater"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={tier.tierLabel}
                            onChange={(e) =>
                              setPriceTiers((prev) =>
                                prev.map((t, idx) =>
                                  idx === i ? { ...t, tierLabel: e.target.value } : t
                                )
                              )
                            }
                            placeholder="e.g. 4-5 Hours"
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Price (IDR ÷100)
                          </label>
                          <input
                            type="number"
                            min={0}
                            step={0.01}
                            value={tier.price}
                            onChange={(e) =>
                              setPriceTiers((prev) =>
                                prev.map((t, idx) =>
                                  idx === i ? { ...t, price: e.target.value } : t
                                )
                              )
                            }
                            placeholder="e.g. 6000"
                            className={inputCls}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() =>
                  setPriceTiers((prev) => [
                    ...prev,
                    { tierGroup: "", tierLabel: "", price: "", sortOrder: prev.length },
                  ])
                }
                className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-gray-100 rounded-xl text-sm font-bold text-gray-400 hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Add Price Tier
              </button>

              {priceTiers.length === 0 && (
                <p className="text-xs text-gray-400 text-center">
                  No price tiers added. The base price above will be used.
                </p>
              )}
            </section>
          </form>
        </div>

        {/* Right Column: Sticky Sidebar for Gallery & Submit */}
        <div className="lg:col-span-5 space-y-8">
          <div className="sticky top-10 space-y-8">
            {/* Gallery Section */}
            <section className="bg-white rounded-xl border border-gray-100 shadow-xl shadow-gray-200/20 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 tracking-tight">Gallery</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                    {images.length + localFiles.length} Total Images
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploadPending}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/30 active:scale-90 disabled:opacity-50"
                >
                  {uploadPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ImagePlus className="w-5 h-5" />
                  )}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple={!activity}
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>

              <div className="space-y-4">
                {(images.length === 0 && localFiles.length === 0) ? (
                  <div 
                    onClick={() => fileRef.current?.click()}
                    className="group cursor-pointer border-2 border-dashed border-gray-100 rounded-xl py-16 text-center hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-emerald-50 transition-all">
                      <ImagePlus className="w-8 h-8 text-gray-200 group-hover:text-emerald-500 transition-colors" />
                    </div>
                    <p className="text-sm font-semibold text-gray-400 group-hover:text-emerald-700 transition-colors">Select Photos</p>
                    <p className="text-[10px] text-gray-300 uppercase tracking-widest mt-1">PNG, JPG up to 10MB</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Existing Images */}
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border-2 border-transparent hover:border-emerald-400 transition-all"
                      >
                        <Image
                          src={img.imageUrl}
                          alt="Activity"
                          fill
                          className="object-cover transition-transform group-hover:scale-110 duration-500"
                        />
                        {img.isPrimary && (
                          <div className="absolute top-2 left-2 z-10">
                            <span className="px-3 py-1 text-[10px] font-bold bg-emerald-500 text-white rounded-full flex items-center gap-1 shadow-md uppercase tracking-widest">
                              Main
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                          {!img.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimary(img.id)}
                              className="w-10 h-10 bg-white/20 hover:bg-white/40 rounded-xl transition text-white flex items-center justify-center backdrop-blur-md border border-white/20"
                              title="Set as main"
                            >
                              <Star className="w-5 h-5 fill-white" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img.id)}
                            disabled={deletePending && imageToDelete?.id === img.id}
                            className="w-10 h-10 bg-red-500/80 hover:bg-red-500 rounded-xl transition text-white flex items-center justify-center backdrop-blur-sm shadow-lg disabled:opacity-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Local Selected Files (Unsaved) */}
                    {localFiles.map((lf, i) => (
                      <div
                        key={i}
                        className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100 border-2 border-blue-400 ring-4 ring-blue-50/50 transition-all"
                      >
                        <Image
                          src={lf.preview}
                          alt="Local preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 left-2 z-10">
                          <span className="px-3 py-1 text-[8px] font-black bg-blue-500 text-white rounded-full shadow-md uppercase tracking-[0.15em]">
                            New
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(undefined, i)}
                            className="w-10 h-10 bg-red-500/80 hover:bg-red-500 rounded-xl transition text-white flex items-center justify-center backdrop-blur-sm"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {localFiles.length > 0 && !activity && (
                <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[10px] font-bold text-blue-700 uppercase tracking-widest flex items-center gap-2">
                    <Info className="w-3 h-3" />
                    Pending Upload
                  </p>
                  <p className="text-xs text-blue-600/80 mt-1">These {localFiles.length} images will be uploaded when you create the activity.</p>
                </div>
              )}
            </section>

            {/* Actions Panel */}
            <section className="bg-zinc-900 rounded-xl p-8 shadow-2xl shadow-zinc-950/20 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-all duration-1000" />
              
              <div className="relative z-10 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">Finalize</h3>
                  <p className="text-xs text-zinc-500 font-medium">Review your changes before publishing live.</p>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    form="activity-form"
                    type="submit"
                    disabled={pending}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all shadow-xl shadow-emerald-900/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {pending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {activity ? "Update Adventure" : "Launch Activity"}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          if (!deletePending) {
            setIsDeleteModalOpen(false);
            setImageToDelete(null);
          }
        }}
        onConfirm={confirmDeleteImage}
        isPending={deletePending}
        title="Delete Image"
        message="Are you sure you want to remove this photo? If it's already saved, this action is permanent."
        confirmText="Remove Photo"
      />
    </div>
  );
}

// Simple internal component for Chevron
function ChevronRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
