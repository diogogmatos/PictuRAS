import { api } from "./axios";
import axios from "axios";
import JSZip from "jszip";
import { ToolNames, ToolParams } from "./tool-types";

export interface Project {
  _id: string;
  user_id: string;
  name: string;
}

export interface SingleProject {
  _id: string;
  user_id: string;
  name: string;
  tools: ProjectToolResponse[];
  imgs: ProjectImage[];
}
export interface ProjectImage {
  _id: string;
  name: string;
  url: string;
}

export interface ProjectImageText {
  _id: string;
  name: string;
  text: string;
}

export interface ProjectTool {
  _id?: string;
  position: number;
  procedure: ToolNames;
  params: ToolParams;
}

export interface ProjectToolResponse extends Omit<ProjectTool, "_id"> {
  _id: string;
}

export const fetchProjects = async (uid: string, token: string) => {
  const response = await api.get<Project[]>(`/projects/${uid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to fetch projects");

  return response.data.map((p) => ({
    _id: p._id,
    user_id: p.user_id,
    name: p.name,
  })) as Project[];
};

export const fetchProject = async (uid: string, pid: string, token: string) => {
  const response = await api.get<SingleProject>(`/projects/${uid}/${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to fetch project");

  return {
    _id: response.data._id,
    user_id: response.data.user_id,
    name: response.data.name,
    imgs: response.data.imgs,
    tools: response.data.tools,
  } as SingleProject;
};

export const addProject = async ({
  uid,
  token,
  name,
  images = [],
}: {
  uid: string;
  token: string;
  name: string;
  images?: File[];
}) => {
  const response = await api.post<SingleProject>(
    `/projects/${uid}`,
    {
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 201 || !response.data)
    throw new Error("Failed to create project");

  if (images.length > 0) {
    const project = response.data;

    await addProjectImages({
      uid,
      pid: project._id,
      token,
      images,
    });

    return response.data;
  }
};

export const deleteProject = async ({
  uid,
  pid,
  token,
}: {
  uid: string;
  pid: string;
  token: string;
}) => {
  const response = await api.delete(`/projects/${uid}/${pid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 204) throw new Error("Failed to delete project");
};

export const updateProject = async ({
  uid,
  pid,
  token,
  name,
}: {
  uid: string;
  pid: string;
  token: string;
  name: string;
}) => {
  const response = await api.put(
    `/projects/${uid}/${pid}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 204) throw new Error("Failed to update project");
};

export const getProjectImages = async (
  uid: string,
  pid: string,
  token: string,
) => {
  const response = await api.get<ProjectImage[]>(
    `/projects/${uid}/${pid}/imgs`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to fetch project images");

  return response.data.map((img) => ({
    _id: img._id,
    name: img.name,
    url: img.url,
  })) as ProjectImage[];
};

export const getProjectImage = async (
  uid: string,
  pid: string,
  imageId: string,
  token: string,
) => {
  const response = await api.get<ProjectImage>(
    `/projects/${uid}/${pid}/img/${imageId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to fetch project image");

  return {
    _id: response.data._id,
    name: response.data.name,
    url: response.data.url,
  } as ProjectImage;
};

export const downloadProjectImage = async ({
  imageUrl,
  imageName,
}: {
  imageUrl: string;
  imageName: string;
}) => {
  const response = await axios.get<ArrayBuffer>(imageUrl, {
    responseType: "arraybuffer",
  });

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to download project image");

  const blob = new Blob([response.data], { type: "image/png" });
  const file = new File([blob], imageName, { type: "image/png" });

  return {
    name: imageName,
    file,
  };
};

export const downloadProjectImages = async ({
  uid,
  pid,
  token,
}: {
  uid: string;
  pid: string;
  token: string;
}) => {
  const project = await fetchProject(uid, pid, token);
  const zip = new JSZip();

  for (const image of project.imgs) {
    const { name, file } = await downloadProjectImage({
      imageUrl: image.url,
      imageName: image.name,
    });
    zip.file(name, file);
  }

  const blob = await zip.generateAsync({ type: "blob" });
  const file = new File([blob], `${project.name}.zip`, {
    type: "application/zip",
  });

  return {
    name: project.name,
    file,
  };
};

export const addProjectImages = async ({
  uid,
  pid,
  token,
  images,
}: {
  uid: string;
  pid: string;
  token: string;
  images: File[];
}) => {
  for (const image of images) {
    const formData = new FormData();
    formData.append("image", image);

    const response = await api.post(`/projects/${uid}/${pid}/img`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201 || !response.data)
      throw new Error("Failed to upload image: " + image.name);
  }
};

export const deleteProjectImages = async ({
  uid,
  pid,
  token,
  imageIds,
}: {
  uid: string;
  pid: string;
  token: string;
  imageIds: string[];
}) => {
  for (const imageId of imageIds) {
    const response = await api.delete(
      `/projects/${uid}/${pid}/img/${imageId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 204)
      throw new Error("Failed to delete image: " + imageId);
  }
};

export const previewProjectImage = async ({
  uid,
  pid,
  imageId,
  token,
}: {
  uid: string;
  pid: string;
  imageId: string;
  token: string;
}) => {
  const response = await api.post(
    `/projects/${uid}/${pid}/preview/${imageId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 201 || !response.data)
    throw new Error("Failed to request preview");
};

export const addProjectTool = async ({
  uid,
  pid,
  tool,
  token,
}: {
  uid: string;
  pid: string;
  tool: ProjectTool;
  token: string;
}) => {
  const response = await api.post(
    `/projects/${uid}/${pid}/tool`,
    {
      ...tool,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 201) throw new Error("Failed to add tool");
};

export const updateProjectTool = async ({
  uid,
  pid,
  toolId,
  toolParams,
  token,
}: {
  uid: string;
  pid: string;
  toolId: string;
  toolParams: ToolParams;
  token: string;
}) => {
  const response = await api.put(
    `/projects/${uid}/${pid}/tool/${toolId}`,
    {
      params: toolParams,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 204) throw new Error("Failed to update tool");
};

export const deleteProjectTool = async ({
  uid,
  pid,
  toolId,
  token,
}: {
  uid: string;
  pid: string;
  toolId: string;
  token: string;
}) => {
  const response = await api.delete(`/projects/${uid}/${pid}/tool/${toolId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 204) throw new Error("Failed to remove tool");
};

export const clearProjectTools = async ({
  uid,
  pid,
  token,
  toolIds,
}: {
  uid: string;
  pid: string;
  token: string;
  toolIds: string[];
}) => {
  for (const toolId of toolIds) {
    await deleteProjectTool({ uid, pid, toolId, token });
  }
};

export const downloadProjectResults = async ({
  uid,
  pid,
  projectName,
  token,
}: {
  uid: string;
  pid: string;
  projectName: string;
  token: string;
}) => {
  const response = await api.get<ArrayBuffer>(
    `/projects/${uid}/${pid}/process`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "arraybuffer",
    },
  );

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to process project");

  const blob = new Blob([response.data], { type: "application/zip" });
  const file = new File([blob], projectName + "_edited.zip", {
    type: "application/zip",
  });

  return {
    name: projectName,
    file,
  };
};

export const fetchProjectResults = async (
  uid: string,
  pid: string,
  token: string,
) => {
  const response = await api.get<{
    imgs: {
      og_img_id: string;
      name: string;
      url: string;
    }[];
    texts: {
      og_img_id: string;
      name: string;
      url: string;
    }[];
  }>(`/projects/${uid}/${pid}/process/url`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 || !response.data)
    throw new Error("Failed to fetch project results");

  const texts: ProjectImageText[] = [];
  for (const text of response.data.texts) {
    const response = await axios.get<string>(text.url, {
      responseType: "text",
    });

    if (response.status !== 200 || !response.data)
      throw new Error("Failed to fetch text");

    texts.push({
      _id: text.og_img_id,
      name: text.name,
      text: response.data,
    });
  }

  return {
    imgs: response.data.imgs.map(
      (img) =>
        ({
          _id: img.og_img_id,
          name: img.name,
          url: img.url,
        }) as ProjectImage,
    ),
    texts: texts,
  };
};

export const processProject = async ({
  uid,
  pid,
  token,
}: {
  uid: string;
  pid: string;
  token: string;
}) => {
  const response = await api.post<string>(
    `/projects/${uid}/${pid}/process`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 201 || !response.data)
    throw new Error("Failed to request project processing");
};
