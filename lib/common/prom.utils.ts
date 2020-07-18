
import * as client from 'prom-client';
import { IMetricArguments } from '../interfaces';

export function getMetricToken(type: string, name: string) {
  return `${name}${type}`;
}

export function getRegistryName(name: string) {
  return `${name}PromRegistry`;
}

export function getOptionsName(name: string) {
  return `${name}PromOptions`;
}

export const findOrCreateMetric = ({
  name,
  type,
  help,
  labelNames,
}: {
  name: string;
  type: string;
  help?: string;
  labelNames?: string[];
}): client.Metric<string> => {
  let metric: client.Metric<string> = client.register.getSingleMetric(name);
  if (!metric) {
    return new client.Counter({
      name: name,
      help: help || `${name} ${type}`,
      labelNames,
    });
  }

  if (metric instanceof client.Counter === false) {
    return new client.Counter({
      name: getMetricToken(type, name),
      help: help || `${name} ${type}`,
    });
  }

  return metric;  
}

export const findOrCreateCounter = ({
  name,
  help,
  labelNames,
}: IMetricArguments): client.Counter => {
  return findOrCreateMetric({
    name,
    help,
    type: `Counter`,
    labelNames,
  }) as client.Counter<string>;
};

export const findOrCreateGauge = ({
  name,
  help,
  labelNames,
}: IMetricArguments): client.Gauge => {
  return findOrCreateMetric({
    name,
    help,
    type: `Gauge`,
    labelNames,
  }) as client.Gauge<string>;
};

export const findOrCreateHistogram = ({
  name,
  help,
  labelNames,
}: IMetricArguments): client.Histogram => {
  return findOrCreateMetric({
    name,
    help,
    type: `Histogram`,
    labelNames,
  }) as client.Histogram<string>;
};

export const findOrCreateSummary = ({
  name,
  help,
  labelNames,
}: IMetricArguments): client.Summary => {
  return findOrCreateMetric({
    name,
    help,
    type: `Summary`,
    labelNames,
  }) as client.Summary<string>;
};
