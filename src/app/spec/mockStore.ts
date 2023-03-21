export const createMockStore = () => ({
  dispatch: jest.fn(),
  select: jest.fn().mockReturnValue([
    {
      projectTitle: "Mock Project",
      backupImage: "url",
      shortDescription: "Mock short description",
      fullDescription: "Mock full description",
      stack: "Mock Stack",
      technologies: ["Mock", "Test", "Fake"],
      yearsOfExperience: "<1 year",
      creator: "Mock Creator",
      id: "1",
    },
    {
      projectTitle: "Mock Project",
      backupImage: "url",
      shortDescription: "Mock short description",
      fullDescription: "Mock full description",
      stack: "Mock Stack",
      technologies: ["Mock", "Test", "Fake"],
      yearsOfExperience: "<1 year",
      creator: "Mock Creator",
      id: "2",
    },
  ]),
});
