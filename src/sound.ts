/*
 * One tick, synthesised. No audio file: this is twelve milliseconds of noise
 * through a bandpass, which is smaller than any asset that could hold it and
 * lets the pitch move slightly on every hit, so a sweep across the dock sounds
 * like a row of detents rather than one sample retriggered.
 *
 * Nothing here plays on its own. The only caller is a pointer crossing a dock
 * icon, so the sound exists while the cursor is on the dock and nowhere else -
 * it stops the moment the cursor leaves, because there was never anything
 * running to stop.
 */

/*
 * Both the context and the noise are built on the first tick rather than at
 * import: an AudioContext opened on page load is a suspended one, and on some
 * browsers a warning in the console as well.
 */
let ctx: AudioContext | null = null
let noise: AudioBuffer | null = null
let last = 0

/** Two ticks closer together than this are one crossing, not two. */
const gap = 45

const quiet = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

function context() {
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  /* Suspended until a gesture; resuming is a promise deliberately dropped. */
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/**
 * A short click. `strength` scales it, so one caller can sit under another;
 * the ceiling is low on purpose - this belongs under the room, not over it.
 */
export function tick(strength = 1) {
  if (quiet()) return

  const now = performance.now()
  if (now - last < gap) return
  last = now

  const audio = context()
  if (!audio || audio.state !== 'running') return

  if (!noise) {
    const frames = Math.ceil(audio.sampleRate * 0.012)
    noise = audio.createBuffer(1, frames, audio.sampleRate)
    const channel = noise.getChannelData(0)
    for (let i = 0; i < frames; i += 1) {
      /* Faded across the buffer, so the tail is a decay rather than a cut. */
      channel[i] = (Math.random() * 2 - 1) * (1 - i / frames)
    }
  }

  const t = audio.currentTime
  const source = audio.createBufferSource()
  source.buffer = noise

  const band = audio.createBiquadFilter()
  band.type = 'bandpass'
  /* A little scatter, so repeated ticks are not the same tick twice. */
  band.frequency.value = 1900 + Math.random() * 500
  band.Q.value = 1.6

  const gain = audio.createGain()
  gain.gain.setValueAtTime(0.22 * strength, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.05)

  source.connect(band).connect(gain).connect(audio.destination)
  source.start(t)
  source.stop(t + 0.06)
  source.onended = () => source.disconnect()
}

/**
 * Browsers keep an audio context silent until the page has had a real gesture,
 * and hovering is not one. So the context is opened on the first click, tap or
 * keypress anywhere on the page; by the time anyone sweeps the dock it is
 * usually already unlocked. Before that first gesture the dock is silent, which
 * is the browsers' rule rather than something to work around.
 */
export function listenForFirstGesture() {
  const events = ['pointerdown', 'keydown', 'touchstart'] as const
  const unlock = () => {
    context()
    for (const event of events) window.removeEventListener(event, unlock)
  }
  for (const event of events) window.addEventListener(event, unlock, { passive: true })
}
