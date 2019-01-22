package de.fraunhofer.iosb.maypadbackend.model.build;

import de.fraunhofer.iosb.maypadbackend.model.webhook.ExternalWebhook;
import de.fraunhofer.iosb.maypadbackend.services.build.BuildTypeExec;
import de.fraunhofer.iosb.maypadbackend.services.build.WebhookBuildExecutor;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

/**
 * A build that is triggered by calling a webhook.
 *
 * @author Lukas Brosch
 * @version 1.0
 */
@Data
@Entity
@BuildTypeExec(executor = WebhookBuildExecutor.class)
public class WebhookBuild extends BuildType {

    @OneToOne(cascade = CascadeType.ALL)
    private ExternalWebhook buildWebhook;

}
