import { Right } from '../../../models';
import { rightProcessor } from '../utils/dataProcessor';

// Get All rights
const getAllRights = async(): Promise<Right[]> => {
  const result = await Right.findAll({});
  return result;
};

// Get a right based on ID
const getRight = async(id: number): Promise<Right> => {
  const result = await Right.findByPk(id);
  if (!result) {
    throw new Error ('the right not found');
  }
  return result;
};

// Create a new right
const createRight = async (rightData: unknown): Promise<Right> => {
  const newRightData = rightProcessor(rightData);
  const { right, relatedModule } = newRightData;
    try {
      const newRight = await Right.create({ right, relatedModule });
      return newRight;
    } catch(err : unknown) {
      let errorMessage = 'Something went wrong.';
      if (err instanceof Error) {
        errorMessage += ' Error: ' + err.message;
      }
      throw new Error(errorMessage);
    } 
};
/*
const updateRight = async ({ id, rightData }) => {
  const newData = await rightProcessor(rightData)

  try {
    const right = await Right.findByPk(id)
    await right.update(newData)
    if (rightData.rights.length > 0) {
      updateRightRights({ id : right.id, rights: rightData.rights })
    }
    return right
  } catch(err) {
    throw new Error(err.original.detail)
  }
}

const updateRightRights = async ({ id, rights }) => {

  const right = await Right.findByPk(id)
  if (!right) {
    throw new Error('right not found')
  }
  await right.setRights([])
  const okRights = await Right.findAll({ where: { id: [...rights], active: true } })
  if (okRights.length === 0) {
    throw new Error('no Active right found')
  }
  try {
    await right.addRights(okRights)
    const result = await Right.findByPk(id,{
      attributes : { exclude: ['password', 'rightRights'] },
      include: {
        model: Right,
        attributes: ['rightName'],
        through: {
          attributes: []
        },
        include: {
          model: Right,
          attributes: ['right'],
          through: {
            attributes: []
          },
        }
      }
    })
    return result
  } catch (err) {
    throw new Error('Something wrong happend, Check right\'s rights again')
  }
}
*/
export default {
  getAllRights,
  getRight,
  createRight,
  //updateRight,
  //updateRightRights
};