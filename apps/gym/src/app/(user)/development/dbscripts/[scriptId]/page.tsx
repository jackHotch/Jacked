import { ExecuteScriptProps } from '@/types'

const ExecuteScript = ({ params }: ExecuteScriptProps) => {
  return <div>{params.scriptId}</div>
}

export default ExecuteScript
