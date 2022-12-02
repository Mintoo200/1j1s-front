import {
  DemandeDeContactCEJ,
  DemandeDeContactEntreprise,
  DemandeDeContactPOE,
} from '~/server/demande-de-contact/domain/DemandeDeContact';
import { StrapiDemandeDeContactRepository } from '~/server/demande-de-contact/infra/strapiDemandeDeContact.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { anHttpClientServiceWithAuthentification } from '~/server/services/http/httpClientService.fixture';

describe('StrapiDemandeDeContactRepository', () => {

  describe('.saveCEJ()', () => {
    const demandeDeContactCEJ: DemandeDeContactCEJ = {
      age: 18,
      codePostal: '75001',
      email: 'test@test.com',
      nom: 'Test',
      prénom: 'TEST',
      téléphone: '0123456789',
      ville: 'Paris',
    };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = {
        data: {
          age: 18,
          code_postal: '75001',
          email: 'test@test.com',
          nom: 'Test',
          prenom: 'TEST',
          telephone: '0123456789',
          ville: 'Paris',
        },
      };
      // When
      await repository.saveCEJ(demandeDeContactCEJ);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contact-cejs', expectedBody);
    });
    it('résout un Success', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.saveCEJ(demandeDeContactCEJ);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = anHttpClientServiceWithAuthentification();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactRepository(spy);
        // When
        const result = await repository.saveCEJ(demandeDeContactCEJ);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });

  describe('.saveEntreprise()', () => {
    const demandeDeContactEntreprise: DemandeDeContactEntreprise = {
      email: 'test@test.com',
      message: 'rrr',
      nom: 'Test',
      prénom: 'TEST',
      sujet: 'super sujet',
      téléphone: '0123456789',
    };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = {
        data: {
          email: 'test@test.com',
          message: 'rrr',
          nom: 'Test',
          prenom: 'TEST',
          sujet: 'super sujet',
          telephone: '0123456789',
        },
      };
      // When
      await repository.saveEntreprise(demandeDeContactEntreprise);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contact-entreprises', expectedBody);
    });
    it('résout un Success', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.saveEntreprise(demandeDeContactEntreprise);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = anHttpClientServiceWithAuthentification();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactRepository(spy);
        // When
        const result = await repository.saveEntreprise(demandeDeContactEntreprise);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });

  describe('.savePOE()', () => {
    const demandeDeContactPOE: DemandeDeContactPOE = {
      codePostal: '75001',
      commentaire: 'Coucou un commentaire',
      email: 'test@test.com',
      nom: 'TEST',
      nomSociété: 'Société de test',
      nombreARecruter: '5',
      prénom: 'Test',
      secteur: 'agriculture',
      siret: '12345678901234',
      taille: 'small',
      travail: 'Assistance téléphonique',
      téléphone: '0123456789',
      ville: 'Paris',
    };

    it('fait un POST vers Strapi', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      const expectedBody = {
        data: {
          code_postal: '75001',
          commentaire: 'Coucou un commentaire',
          email: 'test@test.com',
          nom: 'TEST',
          nom_societe: 'Société de test',
          nombreARecruter: '5',
          prenom: 'Test',
          secteur: 'agriculture',
          siret: '12345678901234',
          taille: 'small',
          telephone: '0123456789',
          travail: 'Assistance téléphonique',
          ville: 'Paris',
        },
      };
      // When
      await repository.savePOE(demandeDeContactPOE);
      // Then
      expect(spy.post).toHaveBeenCalledWith('contacts-poe', expectedBody);
    });

    it('résout un Success', async () => {
      // Given
      const spy = anHttpClientServiceWithAuthentification();
      const repository = new StrapiDemandeDeContactRepository(spy);
      // When
      const result = await repository.savePOE(demandeDeContactPOE);
      // Then
      expect(result).toEqual(createSuccess(undefined));
    });

    describe('Quand la requête HTTP échoue', () => {
      it('Résout une Failure', async () => {
        // Given
        const spy = anHttpClientServiceWithAuthentification();
        jest.spyOn(spy, 'post').mockRejectedValue(new Error('Erreur non gérée'));
        const repository = new StrapiDemandeDeContactRepository(spy);
        // When
        const result = await repository.savePOE(demandeDeContactPOE);
        // Then
        expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
      });
    });
  });
});