import { useState } from 'react'
import sectionStyles from '../Section.module.css'
import styles from './DatabaseScripts.module.css'
import { Terminal, Download, Upload, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal'
import { useExportWeight } from '@/hooks/api/useExportWeight'

export const DatabaseScripts = () => {
  const [showCacheModal, setShowCacheModal] = useState(false)
  const [showExportWeightModal, setShowExportWeightModal] = useState(false)
  const router = useRouter()

  const exportWeightMutation = useExportWeight()

  const handleExportWeight = async () => {
    await exportWeightMutation.mutateAsync()
    setShowExportWeightModal(false)
  }

  return (
    <>
      <div className={sectionStyles.section}>
        <h2 className={sectionStyles.header}>
          <Terminal color='var(--primary)' />
          Database Scripts
        </h2>

        <div className={styles.script_list}>
          <div className={styles.script} onClick={() => router.push('/development/dbscripts/update-workouts')}>
            <div>
              <div>Update Workouts</div>
              <div className={sectionStyles.description}>Update the workout and workout sets tables</div>
            </div>
            <Upload color='var(--primary)' />
          </div>

          <div className={styles.script} onClick={() => router.push('/development/dbscripts/update-weights')}>
            <div>
              <div>Update Weight</div>
              <div className={sectionStyles.description}>Update weight table</div>
            </div>
            <Upload color='var(--primary)' />
          </div>

          <div className={styles.script} onClick={() => setShowExportWeightModal(true)}>
            <div>
              <div>Export Weight</div>
              <div className={sectionStyles.description}>Download weight data to a CSV file</div>
            </div>
            <Download color='var(--primary)' />
          </div>

          <div className={styles.script} onClick={() => setShowCacheModal(true)}>
            <div>
              <div>Clear Cache</div>
              <div className={sectionStyles.description}>Remove all cached data from database</div>
            </div>
            <Trash color='var(--primary)' />
          </div>
        </div>
      </div>

      {showExportWeightModal && (
        <ConfirmationModal
          open={showExportWeightModal}
          setOpen={setShowExportWeightModal}
          title='Export Weight'
          description='Download weight data to a CSV file'
          confirmButtonText='Download'
          onClick={handleExportWeight}
          isPending={exportWeightMutation.isPending}
        />
      )}
      {showCacheModal && (
        <ConfirmationModal
          open={showCacheModal}
          setOpen={setShowCacheModal}
          title='Clear Cache'
          description='Remove all cached data from database'
          confirmButtonText='Delete'
          destructive={true}
          onClick={() => null}
          isPending={exportWeightMutation.isPending}
        />
      )}
    </>
  )
}
