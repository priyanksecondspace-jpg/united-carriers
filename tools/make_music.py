"""Synthesize a soft, happy ambient loop (C major) as a WAV file. Stdlib only."""
import math
import struct
import sys
import wave

SR = 22050
BPM = 92
BEAT = 60 / BPM
BARS = 16
LENGTH = BARS * 4 * BEAT
N = int(LENGTH * SR)
buf = [0.0] * N


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def add_note(start, dur, midi, amp, kind):
    f = hz(midi)
    s0 = int(start * SR)
    n = int((dur + (1.6 if kind == "keys" else 0.8)) * SR)
    for i in range(n):
        j = s0 + i
        if j >= N:
            j -= N  # wrap so the loop is seamless
        t = i / SR
        if kind == "keys":
            env = min(1.0, t / 0.008) * math.exp(-t * 2.2)
            v = math.sin(2 * math.pi * f * t) + 0.35 * math.sin(4 * math.pi * f * t) * math.exp(-t * 4)
        elif kind == "pad":
            env = min(1.0, t / 0.9) * (1.0 if t < dur else math.exp(-(t - dur) * 3))
            v = math.sin(2 * math.pi * f * t) + 0.5 * math.sin(2 * math.pi * f * 1.003 * t)
        else:  # bell
            env = min(1.0, t / 0.004) * math.exp(-t * 3.5)
            v = math.sin(2 * math.pi * f * t) + 0.25 * math.sin(2 * math.pi * f * 2.76 * t)
        buf[j] += amp * env * v


# I - vi - IV - V in C major, two chords per pass, repeated
chords = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [57, 60, 65]), (43, [59, 62, 67])]
melody = [72, 76, 79, 76, 74, 72, 74, 76, 72, 69, 72, 74, 71, 74, 79, 77]

for bar in range(BARS):
    root, tones = chords[bar % 4]
    t0 = bar * 4 * BEAT
    for m in tones:
        add_note(t0, 4 * BEAT, m - 12, 0.05, "pad")
    add_note(t0, 2 * BEAT, root - 12, 0.08, "keys")
    for k, m in enumerate([tones[0], tones[1], tones[2], tones[1]] * 2):
        add_note(t0 + k * BEAT / 2, BEAT / 2, m, 0.045, "keys")
    if bar >= 2:
        for k in range(2):
            m = melody[(bar * 2 + k) % len(melody)]
            add_note(t0 + k * 2 * BEAT + (BEAT if k else 0), BEAT, m, 0.05, "bell")

peak = max(abs(x) for x in buf) or 1
out = sys.argv[1]
with wave.open(out, "w") as w:
    w.setnchannels(1)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(b"".join(struct.pack("<h", int(32767 * 0.8 * x / peak)) for x in buf))
print(out, round(LENGTH, 1), "s")
