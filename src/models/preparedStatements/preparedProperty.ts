import { BinaryOperator, Column, sql } from 'drizzle-orm';

import { db } from '@/models';
import { unit } from '@/models/schema';

type UnitType = typeof unit.$inferSelect;

const preparedProperty = db.query.property
  .findFirst({
    columns: {
      id: true,
      listingId: true,
      name: true,
      address: true,
      latitude: true,
      longitude: true,
      yearBuilt: true,
      descriptionTitle: true,
      descriptionSubtitle: true,
      descriptionText: true,
      smoking: true,
      cats: true,
      dogs: true,
      petsNegotiable: true,
      petsFee: true,
      petsFeeInterval: true,
      published: true,
      customerRanking: true,
      paidSearchRanking: true,
    },
    where: (property, { eq }) => eq(property.id, sql.placeholder('id')),
    with: {
      city: {
        columns: {
          name: true,
        },
      },
      featureToProperty: {
        columns: {
          feature: true,
        },
        with: {
          feature: {
            columns: {
              name: true,
            },
          },
        },
      },
      buildingFeatureToProperty: {
        columns: {
          buildingFeature: true,
        },
        with: {
          buildingFeature: {
            columns: {
              name: true,
            },
          },
        },
      },
      community: {
        columns: {
          name: true,
          score: true,
          imageUrl: true,
          quadrant: true,
          sector: true,
          ward: true,
          population: true,
          dwellings: true,
          usedForRenting: true,
          area: true,
          density: true,
          averageIncome: true,
          lowIncome: true,
          immigrants: true,
          elevation: true,
          established: true,
          description: true,
          latitude: true,
          longitude: true,
        },
        with: {
          communityFeatureToCommunity: {
            columns: {
              communityFeature: true,
            },
            with: {
              communityFeature: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
      medias: {
        columns: {
          assetId: true,
          order: true,
        },
      },
      parkings: {
        columns: {
          name: true,
          fee: true,
          feeInterval: true,
        },
      },
      typeProp: {
        columns: {
          name: true,
        },
      },
      floorPlans: {
        columns: {
          name: true,
          order: true,
        },
        with: {
          units: {
            columns: {
              id: true,
              name: true,
              rent: true,
              deposit: true,
              available: true,
              immediate: true,
              availableDate: true,
              shortterm: true,
              longterm: true,
              unitNumber: true,
              unitName: true,
              surface: true,
              furnished: true,
              heat: true,
              water: true,
              electricity: true,
              internet: true,
              television: true,
              order: true,
              published: true,
            },
            where: (unit: UnitType, { eq }: { eq: BinaryOperator }) =>
              eq(unit.published as unknown as Column, true),
            with: {
              bedroom: {
                columns: {
                  name: true,
                },
              },
              bathroom: {
                columns: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  })
  .prepare();

export default preparedProperty;
