import * as storyRepository from "../models/story.js";

export async function getStories(req, res) {
  const email = req.query.email;
  const data = await storyRepository.getAll();
  res.status(200).json(data);
}

export async function getStory(req, res) {
  const id = req.params.id;
  const story = await storyRepository.getById(id);
  if (story) {
    res.status(200).json(story);
  } else {
    res.status(404).json({ message: `해당 스토리가 존재하지 않습니다.` });
  }
}

export async function createStory(req, res) {
  const { content } = req.body;
  const story = await storyRepository.create(content, req.userId);
  res.status(201).json(story);
}

export async function updateStory(req, res) {
  const id = req.params.id;
  const content = req.body.content;
  const story = await storyRepository.getById(id);
  if (!story) {
    return res
      .status(404)
      .json({ message: `해당 스토리가 존재하지 않습니다.` });
  }
  if (story.userId !== req.userId) {
    return res
      .status(403)
      .json({ message: `해당 스토리에 대한 수정 권한이 없습니다.` });
  }
  const updated = await storyRepository.update(id, content);
  res.status(200).json(updated);
}

export async function deleteStory(req, res) {
  const id = req.params.id;
  const story = await storyRepository.getById(id);
  if (!story) {
    return res
      .status(404)
      .json({ message: `해당 스토리가 존재하지 않습니다.` });
  }
  if (story.userId !== req.userId) {
    return res
      .status(403)
      .json({ message: `해당 스토리에 대한 삭제 권한이 없습니다.` });
  }
  await storyRepository.remove(id);
  res.sendStatus(204);
}
