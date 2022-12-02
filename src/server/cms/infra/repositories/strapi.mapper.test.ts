import { anArticle, anArticleResponse } from '~/server/cms/domain/article.fixture';
import { anEspaceJeune,anEspaceJeuneResponse } from '~/server/cms/domain/espaceJeune.fixture';
import {
  mapArticle,
  mapEspaceJeune,
  mapImage,
  mapMentionObligatoire,
} from '~/server/cms/infra/repositories/strapi.mapper';

describe('strapi mapper', () => {
  describe('mapArticle', () => {
    describe('lorsque la liste renvoyée contient 1 article', () => {
      it('retourne l\'article', () => {
        const articleResponse = anArticleResponse();
        const expectedArticle = anArticle();
        const article = mapArticle(articleResponse);
        expect(article).toEqual(expectedArticle);
      });
    });

    describe('lorsque la liste renvoyée contient plusieurs articles', () => {
      it('retourne le premier article de la liste', () => {
        const articleResponse = anArticleResponse({
          data: [{
            attributes: {
              contenu: 'Contenu',
              slug: 'mon-article-1',
              titre: 'Mon article 1',
            },
          },
          {
            attributes: {
              contenu: 'Contenu',
              slug: 'mon-article-2',
              titre: 'Mon article 2',
            },
          }],
        });
        const expectedArticle = anArticle({ contenu: 'Contenu', slug: 'mon-article-1', titre: 'Mon article 1' });
        const article = mapArticle(articleResponse);
        expect(article).toEqual(expectedArticle);
      });
    });
  });

  describe('mapMentionObligatoire', () => {
    it('retourne un article pour les mentions obligatoires', () => {
      const result = mapMentionObligatoire({
        data: {
          attributes: {
            contenu: '<h2>**Fake contenu**</h2><p>super paragraphe</p>',
            slug: 'fake-titre',
            titre: 'Fake titre',
          },
        },
      });
      expect(result).toEqual({
        contenu: '<h2>**Fake contenu**</h2><p>super paragraphe</p>',
        titre: 'Fake titre',
      });
    });
  });

  describe('mapEspaceJeune', () => {
    describe('lorsque la liste contient les espaces jeune', () => {
      it('retourne les espaces jeunes', () => {
        const espaceJeuneResponse = anEspaceJeuneResponse();
        const expectedEspaceJeune = anEspaceJeune();
        const espaceJeune = mapEspaceJeune(espaceJeuneResponse);
        expect(espaceJeune).toEqual(expectedEspaceJeune);
      });
    });
  });

  describe('mapImage', () => {
    describe('quand l image est présente', () => {
      it('retourne l url et l alt', () => {
        const result = mapImage({
          data: {
            attributes: {
              alternativeText: 'alt',
              url: 'url',
            },
          },
        });

        expect(result).toEqual({
          alt: 'alt',
          url: 'url',
        });
      });
    });

    describe('quand l image n est présente', () => {
      it('retourne undefined', () => {
        const result = mapImage({
          data: null,
        });

        expect(result).toEqual(undefined);
      });
    });
  });
});