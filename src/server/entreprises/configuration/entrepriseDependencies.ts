import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';

export interface EntrepriseDependencies {
  lesEntreprisesSEngagementUseCase: LesEntreprisesSEngagentUseCase
}

export const entrepriseDependenciesContainer = (
  rejoindreLaMobilisationRepository: RejoindreLaMobilisationRepository,
): EntrepriseDependencies => {
  return {
    lesEntreprisesSEngagementUseCase: new LesEntreprisesSEngagentUseCase(rejoindreLaMobilisationRepository),
  };
};