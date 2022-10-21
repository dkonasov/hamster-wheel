import { Project } from "../entities/project";
import {
  createProject,
  deleteProject,
  loadProjectsFx,
  projects$,
  selectedProject$,
  selectProject,
  updateProject,
} from "./projects";

const initialProjects: Project[] = [
  {
    name: "Foo",
    id: 1,
  },
  {
    name: "Bar",
    id: 2,
  },
];

const createProjectSpy = jest.fn((project) => Promise.resolve(project));
const updateProjectSpy = jest.fn((project) => Promise.resolve(project));
const deleteProjectSpy = jest.fn((id) => Promise.resolve(id));

describe("Projects state", () => {
  beforeAll(() => {
    window.backend = {
      listProjects: () => Promise.resolve(initialProjects),
      createProject: createProjectSpy,
      updateProject: updateProjectSpy,
      deleteProject: deleteProjectSpy,
    } as unknown as typeof backend;
  });

  beforeEach(() => {
    projects$.reset();
  });
  it("should be null on initialization", () => {
    expect(projects$.getState()).toBeNull();
  });

  it("should load projects", async () => {
    await loadProjectsFx();

    expect(projects$.getState()).toEqual(initialProjects);
  });

  it("should pass project to createProject api method in create project effect", async () => {
    const project: Project = { name: "some project" };
    await loadProjectsFx();
    await createProject(project);

    expect(createProjectSpy).toHaveBeenCalledWith(project);
  });

  it("should update projects state if create project effect was successfull", async () => {
    const project: Project = { name: "some project" };
    await loadProjectsFx();
    await createProject(project);

    const projects = projects$.getState();
    expect(projects.length).toBe(3);
    expect(projects[2].name).toBe(project.name);
  });

  it("should pass project to updateProject api method in update project effect", async () => {
    const project: Project = { name: "new project name", id: 1 };
    await loadProjectsFx();
    await updateProject(project);

    expect(updateProjectSpy).toHaveBeenCalledWith(project);
  });

  it("should update projects state if update effect was successfull", async () => {
    const project: Project = { name: "new project name", id: 1 };
    await loadProjectsFx();
    await updateProject(project);

    const projects = projects$.getState();
    const updatedProject = projects.find((val) => val.id === project.id);

    expect(updatedProject).toBeTruthy();
    expect(updatedProject.name).toBe(project.name);
  });

  it("should pass project id deleteProject api method in delete project effect", async () => {
    const id = 1;
    await loadProjectsFx();
    await deleteProject(id);

    expect(deleteProjectSpy).toHaveBeenCalledWith(id);
  });

  it("should update projects state if delete effect was successfull", async () => {
    const id = 1;
    await loadProjectsFx();
    await deleteProject(id);

    const projects = projects$.getState();

    expect(projects.length).toBe(1);
    expect(projects[0].id).toBe(2);
  });

  describe("selectedProject state", () => {
    beforeEach(() => {
      selectedProject$.reset();
    });

    it("should equal null when inited", () => {
      expect(selectedProject$.getState()).toBeNull();
    });

    it("should be setted if selectProject action was dispatched", () => {
      selectProject(42);
      expect(selectedProject$.getState()).toBe(42);
    });
  });
});
