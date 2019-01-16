package de.fraunhofer.iosb.maypadbackend.model.person;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * An Email-Adress.
 *
 * @author Lukas Brosch
 * @version 1.0
 */
@Data
@NoArgsConstructor
@Entity
public class Mail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", updatable = false, nullable = false)
    private int id;
    @Column
    private String mailAddress;

    /**
     * Constructor for Mail.
     * @param mailAddress the Mailaddress
     */
    public Mail(String mailAddress) {
        this.mailAddress = mailAddress;
    }
}