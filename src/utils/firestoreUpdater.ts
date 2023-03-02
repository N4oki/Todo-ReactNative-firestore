import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {TaskData} from './context';

const uid = auth().currentUser?.uid;

interface FirebaseUpdateProps {
  id?: string | undefined;
  key: 'addEdit' | 'delete' | 'deleteAll' | 'toggleIsDone' | 'toggleEditMode';
  isDone?: boolean;
  isEditMode?: boolean;
  editModeTask?: TaskData | undefined;
  newData?: TaskData;
}

export const updater = async ({
  id,
  key,
  isDone,
  editModeTask,
  newData,
}: FirebaseUpdateProps) => {
  const ref = firestore().collection('users').doc(uid).collection('todos');

  switch (key) {
    case 'addEdit':
      if (!newData) return;
      const docRef = editModeTask
        ? ref.doc(editModeTask.id.toString())
        : ref.doc();

      await docRef
        .set(newData)
        .then()
        .catch(e => console.log(e));

    case 'delete':
      ref.doc(id).delete();
      break;

    case 'deleteAll':
      ref.get().then(querySnapshot => {
        if (querySnapshot.docs.length === 0) return;
        Promise.all(querySnapshot.docs.map(d => d.ref.delete()));
      });
      break;
    case 'toggleIsDone':
      ref.doc(id).update({
        isDone: !isDone,
      });
      break;
    case 'toggleEditMode':
      ref.doc(id).update({isEditMode: !editModeTask?.isEditMode});
      break;

    default:
      break;
  }
};
