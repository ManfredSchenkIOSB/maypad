package de.fraunhofer.iosb.maypadbackend.controller.api;

import de.fraunhofer.iosb.maypadbackend.dtos.mapper.BranchMapper;
import de.fraunhofer.iosb.maypadbackend.dtos.mapper.BuildMapper;
import de.fraunhofer.iosb.maypadbackend.dtos.mapper.DeploymentMapper;
import de.fraunhofer.iosb.maypadbackend.dtos.request.BuildRequest;
import de.fraunhofer.iosb.maypadbackend.dtos.request.DeploymentRequest;
import de.fraunhofer.iosb.maypadbackend.dtos.response.BranchResponse;
import de.fraunhofer.iosb.maypadbackend.dtos.response.BuildResponse;
import de.fraunhofer.iosb.maypadbackend.dtos.response.DeploymentResponse;
import de.fraunhofer.iosb.maypadbackend.model.repository.Branch;
import de.fraunhofer.iosb.maypadbackend.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
public class BranchController implements BranchApi {

    private ProjectService projectService;
    private BranchMapper branchMapper;
    private BuildMapper buildMapper;
    private DeploymentMapper deploymentMapper;

    /**
     * Constructor for BranchController.
     * @param projectService the ProjectServices used to access projects
     * @param branchMapper the mapper used to map branches to branch-responses
     * @param buildMapper the mapper used to map builds to build-responses
     * @param deploymentMapper the mapper used to map deployments to deployment-responses
     */
    @Autowired
    public BranchController(ProjectService projectService, BranchMapper branchMapper,
                            BuildMapper buildMapper, DeploymentMapper deploymentMapper) {
        this.projectService = projectService;
        this.branchMapper = branchMapper;
        this.buildMapper = buildMapper;
        this.deploymentMapper = deploymentMapper;
    }

    @Override
    public List<BranchResponse> getBranches(int id) {
        return branchMapper.toResponseList(projectService.getBranches(id));
    }

    @Override
    public BranchResponse getBranch(int id, String ref) {
        return branchMapper.toResponse(projectService.getBranch(id, ref));
    }

    @Override
    public List<BuildResponse> getBuilds(int id, String ref) {
        return buildMapper.toResponseList(projectService.getBranch(id, ref).getBuilds());
    }

    @Override
    public List<DeploymentResponse> getDeployments(int id, String ref) {
        return deploymentMapper.toResponseList(projectService.getBranch(id, ref).getDeployments());
    }

    @Override
    public void triggerBuild(int id, String ref, @Valid BuildRequest request) {
        Branch branch = projectService.getBranch(id, ref);

        //TODO: Call BuildService
    }

    @Override
    public void triggerDeployment(int id, String ref, @Valid DeploymentRequest request) {
        Branch branch = projectService.getBranch(id, ref);

        //TODO: Call DeploymentService
    }

    @Override
    public void notifyRepoUpdate(int id, String ref, String token) {
        Branch branch = projectService.getBranch(id, ref);

        //TODO: Call RepoService
    }

    @Override
    public void notifyBuildSuccess(int id, String ref, String token) {
        Branch branch = projectService.getBranch(id, ref);

        //TODO: Call BuildService
    }

    @Override
    public void notifyBuildFailure(int id, String ref, String token) {
        Branch branch = projectService.getBranch(id, ref);

        //TODO: Call BuildService
    }
}